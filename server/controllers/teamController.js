const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME 
});

exports.view = (req, res) => {
  connection.query('SELECT * FROM footballData;', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from football table: \n', rows);
  });
}

exports.find = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM footballData WHERE teamName LIKE ? OR league LIKE ? OR venue LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from football table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-team');
}

exports.create = (req, res) => {
  const { league, teamName, teamLogo, venue, venueImage } = req.body;

  connection.query('INSERT INTO footballData SET league = ?, teamName = ?, teamLogo = ?, venue = ?, venueImage = ?', [league, teamName, teamLogo, venue, venueImage], (err, rows, fields) => {
    if (!err) {
      res.render('add-team', { alert: 'Team added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from football table: \n', rows);
  });
}

exports.edit = (req, res) => {
  connection.query('SELECT * FROM footballData WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-team', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from football table: \n', rows);
  });
}

exports.update = (req, res) => {
  const { league, teamName, teamLogo, venue, venueImage } = req.body;

  connection.query('UPDATE footballData SET league = ?, teamName = ?, teamLogo = ?, venue = ?, venueImage = ? WHERE id = ?', [league, teamName, teamLogo, venue, venueImage, req.params.id], (err, rows) => {

    if (!err) {
      connection.query('SELECT * FROM footballData WHERE id = ?', [req.params.id], (err, rows) => {
        
        if (!err) {
          res.render('edit-team', { rows, alert: `${teamName} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from football table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from football table: \n', rows);
  });
}

exports.delete = (req, res) => {

  connection.query('DELETE FROM footballData WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from football table are: \n', rows);
  });

}

exports.viewall = (req, res) => {

  connection.query('SELECT * FROM footballData WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-team', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from football table: \n', rows);
  });

}