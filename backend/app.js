require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('./model/patient');
const User = require('./model/user');
const { encrypt, decrypt } = require('./config/encrypt');
const auth = require('./middleware/auth');
var cors = require('cors');
const logger = require('./config/logger');

const app = express();
app.use(cors());
app.use(express.json());

// This is dummy API created to add user first time, This can be ignore later
app.get('/test-user', async (req, res) => {
  const email = 'kashtest13@gmail.com';
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send('User Already Exist. Please try Login');
  }
  const encryptedPassword = await bcrypt.hash('test111', 10);

  // Create user in our database
  const user = await User.create({
    first_name: 'kashinath',
    last_name: 'patil',
    email: 'kashtest13@gmail.com',
    password: encryptedPassword
  });

  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h'
  });

  user.token = token;

  res.status(200).send('Welcome 🙌 , User record added successfully');
});

app.post('/register', async (req, res) => {
  try {
    logger.info(`Request :/register`);
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send('All input is required');
      logger.error('Events Error: All input is required');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      logger.debug('User Already Exist' + oldUser);
      return res.status(409).send('User Already Exist. Please Login');
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h'
    });

    user.token = token;
    logger.info(`user addred successfully. Token:${token}`);

    res.status(200).json({ user });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error' + err);
  }
});

app.post('/login', async (req, res) => {
  try {
    logger.info(`Request: /login`);

    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      logger.debug('email OR password is blank');
      res.status(400).send('All input is required');
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '2h'
      });

      user.token = token;

      logger.info(`User token created successfully. Token:${user.token}`);

      return res.status(200).json(user);
    }
    logger.debug('Invalid Credentials');
    return res.status(404).send('Invalid Credentials');
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error' + err);
  }
});

app.post('/patient', auth, async (req, res) => {
  try {
    logger.info(`Request: POST /patient`);
    // Get Patient input
    const { first_name, last_name, address, city, state, dob, email, phone } = req.body;

    // Validate Patient input
    if (!(first_name && last_name && address && city && state && dob && email && phone)) {
      logger.debug('All inputs are required');
      return res.status(400).send('All inputs are required');
    }

    // check if Patient already exist
    const oldPatient = await Patient.find().then(result => {
      if (result != null) {
        return result.find(record => decrypt(record.email) === email.toLowerCase());
      }
    });

    if (oldPatient) {
      return res.status(409).send('Patient Already Exist.');
    }

    // Create patient in our database
    const patient = await Patient.create({
      first_name: encrypt(first_name),
      last_name: encrypt(last_name),
      address: encrypt(address),
      city: encrypt(city),
      state: encrypt(state),
      dob: encrypt(dob),
      email: encrypt(email.toLowerCase()),
      phone: encrypt(phone)
    });

    logger.info('Added new patient entry' + patient);

    return res.status(200).json({ patient });
  } catch (err) {
    logger.error(err);
  }
});

app.put('/patient', auth, async (req, res) => {
  try {
    logger.info(`Request: PUT /patient`);

    // Get Patient input
    const { first_name, last_name, address, city, state, dob, email, phone } = req.body;

    // Validate Patient input
    if (!(first_name && last_name && address && city && state && dob && email && phone)) {
      logger.debug('All inputs are required');
      res.status(400).send('All input is required');
    }

    // check if Patient already exist
    const oldPatient = await Patient.find().then(result => {
      if (result != null) {
        return result.find(record => decrypt(record.email) === email.toLowerCase());
      }
    });

    if (oldPatient) {
      await oldPatient.updateOne({
        first_name: encrypt(first_name),
        last_name: encrypt(last_name),
        address: encrypt(address),
        city: encrypt(city),
        state: encrypt(state),
        dob: encrypt(dob),
        phone: encrypt(phone)
      });

      logger.info('Patient updated successfully. Email:' + oldPatient.email);
      res.status(200).json({ data: 'Patient updated successfully.' });
    } else {
      logger.debug('Patient not found. Email:' + email);
      res.status(401).send('Patient not found.');
    }
  } catch (err) {
    logger.error(err);
  }
});

app.get('/patients', auth, async (req, res) => {
  try {
    logger.info(`Request: GET /patients`);
    // find Patient by email id
    const patients = await Patient.find().then(result => {
      if (result != null) {
        return result.map(record => {
          return {
            first_name: decrypt(record.first_name),
            last_name: decrypt(record.last_name),
            address: decrypt(record.address),
            city: decrypt(record.city),
            state: decrypt(record.state),
            dob: decrypt(record.dob),
            email: decrypt(record.email),
            phone: decrypt(record.phone)
          };
        });
      }
    });

    if (patients == null) {
      logger.debug('Patient not found');
      return res.status(401).send('Patient not found.');
    }

    logger.info('Retrieving all patients record');
    res.status(200).json({ patients });
  } catch (err) {
    logger.error(err);
  }
});

app.delete('/patient', auth, async (req, res) => {
  try {
    logger.info(`Request: DELETE /patient`);
    // Get Patient input
    const { email } = req.body;

    // Validate Patient input
    if (!email) {
      logger.debug('Email input is required');
      res.status(400).send('Email input is required');
    }

    // find Patient by email id
    const encryptedPatient = await Patient.find().then(result => {
      if (result != null) {
        return result.find(record => decrypt(record.email) === email.toLowerCase());
      }
    });

    if (encryptedPatient == null) {
      logger.debug('Patient not found.');
      return res.status(401).send('Patient not found.');
    }

    await Patient.deleteOne({ email: encryptedPatient.email });

    logger.info('Patient record deleted successfully.' + encryptedPatient.email);
    res.status(200).json({ data: 'Patient record deleted successfully.' });
  } catch (err) {
    logger.error(err);
  }
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server'
    }
  });
});

module.exports = app;
