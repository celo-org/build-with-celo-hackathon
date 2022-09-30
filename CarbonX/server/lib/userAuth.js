/*
 * Request userAuth
 *
 */

// Dependencies
let helpers = require("./helpers");
let sql = require("./sql");
const mail = require("./mail");

// let config = require("./config");
// let bip32 = require("bip32");
// let bip39 = require("bip39");
// let bitcoin = require("bitcoinjs-lib");
// let Wallet = require("ethereumjs-wallet");
// var formidable = require('formidable');
// const { log } = require("console");
// const fs = require('fs')

// Define all the userAuth
var userAuth = {};

// User news Letter subscription
userAuth.newsLetter = function (data, callback) {
  let email =
    typeof data.payload.email == "string" ? data.payload.email.trim() : false;
  let name = typeof data.payload.name == "string" ? data.payload.name : false;
  let device = data.headers["user-agent"];

  sql.Oauth.userNewsLetter(email, name, device, function (err, res) {
    if (res === 0) {
      console.log(`Success ${res}`);
      callback(200, {
        title: "Subscription successful",
        message:
          '<p style="color:green;"> Please check your email, You have been added to our newsletter successfully </p>',
        isSuccess: true,
        icon: "success",
      });
    } else if (res === 1) {
      callback(200, {
        title: "Already subscribed",
        message:
          '<p style="color:green;"> We already have you on our mailing list, Thank you. </p>',
        isSuccess: true,
        icon: "success",
      });
    } else {
      console.log(`Error ${res}`);

      callback(200, {
        title: "Error Occured",
        message: " An error occured while trying to create account ",
        isSuccess: false,
        icon: "error",
      });
    }
  });
};

userAuth.clientAcess = function (data, callback) {
  console.log(data.payload.username);
};

/*
 * JSON API userAuth
 *
 */

// Users
userAuth.users = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    userAuth._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the users methods
userAuth._users = {};

//  Register users into the system
userAuth._users.post = function (data, callback) {
  // Device
  let device = data.headers["user-agent"];
  // Check that all required fields are filled out
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  let email =
    typeof data.payload.email == "string" ? data.payload.email.trim() : false;
  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (firstName && lastName && email && password) {
    sql.user.query(email, function (err, res) {
      if (err) {
        if (res === 0) {
          sql.user.insert(
            firstName,
            lastName,
            email,
            password,
            device,
            (err, res) => {
              if (err) {
                callback(200, {
                  title: "Account created",
                  message:
                    '<p style="color:green;"> Account created successfully </p>',
                  isSuccess: true,
                  icon: "success",
                  redirectUrl: `../auth/otp?v=${res.Oauth_hash}`,
                });
              } else {
                callback(200, {
                  title: "Error Occured",
                  message: " An error occured while trying to create account ",
                  isSuccess: false,
                  icon: "error",
                });
              }
            }
          );
        } else {
          callback(200, {
            title: "Access denied",
            message: `An account with <b>${email}</b> already exist, Try using another email to register.`,
            isSuccess: false,
            icon: "error",
          });
        }
      } else {
        callback(200, {
          title: "Error ocured",
          message: `We're have trouble finding the account that matched with <b>${email}</b>`,
          isSuccess: false,
          icon: "error",
        });
        // callback(500, res);
      }
    });
  } else {
    callback(400, {
      title: "Access denied",
      message: "Missing required fields",
      isSuccess: false,
      icon: "error",
    });
  }
};

// Login users into the system
userAuth.login = function (data, callback) {
  let device = data.headers["user-agent"];
  let email =
    typeof data.payload.email == "string" ? data.payload.email.trim() : false;
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (email && password) {
    var hashedPassword = helpers.hash(password);

    sql.Oauth.getUser(email, (err, rez) => {
      if (rez.length === 1) {
        if (rez[0].password === hashedPassword) {
          sql.Oauth.resendOtp(email, device, function (err, res) {
            if (err) {
              console.log(res);
              callback(200, {
                title: "Login successful",
                message:
                  '<p style="color:green;"> Account Login successfully </p>',
                isSuccess: true,
                icon: "success",
                redirectUrl: `../auth/otp?v=${res.Oauth_hash}`,
              });
            } else {
              callback(200, {
                title: "An error occured ",
                message: `Error occured, kindly try again`,
                isSuccess: false,
                icon: "error",
              });
              console.log("");
            }
          });
        } else {
          callback(200, {
            title: "Incorrect password ",
            message: `Your password does not match with <b>${email}</b>`,
            isSuccess: false,
            icon: "error",
          });
        }
      } else {
        callback(200, {
          title: "User not found",
          message: `We're have trouble finding the account that matched with <b>${email}</b>`,
          isSuccess: false,
          icon: "error",
        });
      }
    });
  } else {
    callback(500, {
      title: "Access denied",
      message: "Missing required fields",
      isSuccess: false,
      icon: "error",
    });
  }
};

userAuth._users.get = function (data, callback) {
  let email =
    typeof data.payload.email == "string" ? data.payload.email.trim() : false;
  let password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  let tokenId = "pub_test_" + helpers.createRandomString(95);
  let privateKey = "pub_live_" + helpers.createRandomString(56);

  let obj = {
    msg: "Success is given",
    private_key: privateKey,
    public_key: tokenId,
    userInfo: data.headers["user-agent"],
  };
  // callback(200, obj);
};

// Verify OTP QueryString
userAuth.verifyOTPQueryString = function (data, callback) {
  let queryString =
    typeof data.payload.queryString == "string"
      ? data.payload.queryString.trim()
      : false;
  if (queryString) {
    sql.Oauth.verifyOTPQueryString(queryString, (err, res) => {
      if (err) {
        // Errors are not placed the normal way, take note of that.
        if (res.message === 1) {
          let obj = {
            created_at: res.result[0].created_at,
            userEmail: res.result[0].userEmail,
            keyChain: res.result[0].keyChain,
          };
          callback(200, {
            title: "Access granted",
            result: obj,
            message: `Kindly check your mail `,
            isSuccess: true,
            icon: "success",
          });
        } else {
          callback(500, {
            title: "Access denied",
            message: `Access was denied ${res.message}`,
            isSuccess: false,
            icon: "error",
          });
        }
      } else {
        callback(500, {
          title: "Access denied",
          message: `2 Access was denied ${res.message}`,
          isSuccess: false,
          icon: "error",
        });
      }
    });
  } else {
    callback(500, {
      title: "Access denied",
      message: `No Querystring found`,
      isSuccess: false,
      icon: "error",
    });
  }
};

// verify reset password queryString
userAuth.resetOauthResetPasswordString = function (data, callback) {
  let token =
    typeof data.payload.token == "string" ? data.payload.token.trim() : false;
  let hash =
    typeof data.payload.hash == "string" ? data.payload.hash.trim() : false;
  if (token) {
    if (hash) {
      sql.Oauth.recovery.queryToken(token, function (e, r) {
        if (r.length === 1) {
          sql.Oauth.recovery.queryHash(hash, function (err, res) {
            if (res.length === 1) {
              if (Date.now() < res[0].expire_at) {
                callback(200, {
                  title: "Access granted",
                  message: "Change your password",
                  isSuccess: true,
                  icon: "success",
                  redirectUrl: null,
                });
              } else {
                callback(500, {
                  title: "Link Expired",
                  message: `The Link has already expired, Kindly request for another Link `,
                  isSuccess: true,
                  icon: "error",
                  redirectUrl: "../../user/recovery",
                });
              }
            } else {
              callback(500, {
                title: "Url Error",
                message: `Invalid Hash {${hash}} Querystring Found`,
                isSuccess: true,
                icon: "error",
                redirectUrl: "../../user/recovery",
              });
            }
          });
        } else {
          callback(500, {
            title: "Url Error",
            message: `Invalid Token {${token}} Querystring Found`,
            isSuccess: true,
            icon: "error",
            redirectUrl: "../../user/recovery",
          });
        }
      });
    } else {
      callback(500, {
        title: "Url Error",
        message: `No Hash Querystring Found`,
        isSuccess: true,
        icon: "error",
        redirectUrl: "../../user/recovery",
      });
    }
  } else {
    callback(500, {
      title: "Url Error",
      message: `No Token Querystring Found`,
      isSuccess: true,
      icon: "error",
      redirectUrl: "../../user/recovery",
    });
  }
};

// Verify Code
userAuth.verifyOTP = function (data, callback) {
  let device = data.headers["user-agent"];
  var code =
    typeof data.payload.code == "string" && data.payload.code.trim().length == 6
      ? data.payload.code.trim()
      : false;
  if (code) {
    sql.Oauth.getOtp(code, (err, res) => {
      if (err) {
        // Errors are not placed the normal way, take note of that.
        if (res.message === 1) {
          if (Date.now() < res.result[0].expire_at) {
            sql.Oauth._token.post(
              res.result[0].userEmail,
              device,
              (err, tokenRes) => {
                //Generate account token token
                if (err) {
                  //Don't forget, Errors are not placed the normal way, take note of that.
                  callback(200, {
                    title: "Login successful",
                    token: tokenRes,
                    result: res.result,
                    message: `Login successful `,
                    isSuccess: true,
                    icon: "success",
                    redirectUrl: `../dashio/home?azer_token=${tokenRes.azer_token}`,
                  });
                } else {
                  callback(200, {
                    title: "Login failed",
                    message: `Unable to generate token `,
                    isSuccess: false,
                    icon: "error",
                  });
                }
              }
            );
          } else {
            callback(500, {
              title: "OTP Expired",
              message: `The OTP has already expired, Kindly request for another otp `,
              isSuccess: false,
              icon: "error",
            });
          }
        } else {
          callback(500, {
            title: "Access denied",
            message: `Invalid OTP`,
            isSuccess: false,
            icon: "error",
          });
        }
      } else {
        callback(500, {
          title: "Access denied",
          message: `2 Access was denied ${res.message}`,
          isSuccess: false,
          icon: "error",
        });
      }
    });
  } else {
    callback(500, {
      title: "Access denied",
      message: `Invalid OTP found`,
      isSuccess: false,
      icon: "error",
    });
  }
};

// Resend OTP
userAuth.resendOtp = function (data, callback) {
  let email =
    typeof data.payload.email == "string" ? data.payload.email.trim() : false;
  let device = data.headers["user-agent"];

  if (email) {
    sql.Oauth.resendOtp(email, device, function (err, res) {
      if (err) {
        callback(200, {
          title: "Mail sent successfully",
          result: res,
          message: `Login successful `,
          isSuccess: true,
          icon: "success",
          redirectUrl: `../auth/otp?v=${res.Oauth_hash}`,
        });
      } else {
        callback(500, {
          title: "Mail failed",
          message: `An error occured while trying to send email`,
          isSuccess: false,
          icon: "error",
        });
      }
    });
  } else {
    callback(500, {
      title: "Access denied",
      message: `No email found, Kindly check your otp redirect link`,
      isSuccess: false,
      icon: "error",
    });
  }
};

// Get user information with token access
userAuth.tokenAccess = function (data, callback) {
  let token =
    typeof data.payload.token == "string" ? data.payload.token.trim() : false;

  sql.Oauth._token.queryToken(token, (err, res) => {
    if (res.length > 0) {
      sql.Oauth.getUser(res[0].userEmail, (err, userResult) => {
        if (userResult.length === 1) {
          let obj = {
            first_name: userResult[0].first_name,
            last_name: userResult[0].last_name,
            profession: userResult[0].profession,
            twitter: userResult[0].twitter,
            instagram: userResult[0].instagram,
            flag: userResult[0].country_iso2,
            country: userResult[0].country,
            user_email: res[0].userEmail,
            api_key: userResult[0].api_key,
            verified: userResult[0].verify_user,
            expire_at: res[0].expire_at,
          };
          callback(200, obj);
        } else {
          callback(500, {
            title: "Access denied",
            message: `User not found`,
            isSuccess: false,
            icon: "error",
          });
        }
      });
    } else {
      callback(500, {
        title: "Access denied",
        message: `Token not found`,
        isSuccess: false,
        icon: "error",
      });
    }
  });
};

// Get user Notification with token access
userAuth.getNotification = function (data, callback) {

  if(data.method == "post"){

    let token = typeof data.payload.token == "string" ? data.payload.token.trim() : false;

    if(token) {
      sql.Oauth._token.queryToken(token, (err, res) => {
        if (res.length > 0) {
          sql.Oauth.getUser(res[0].userEmail, (err, userResult) => {
            if (userResult.length === 1) {
              let obj = {
                api_key: userResult[0].api_key,
              };

              sql.user.queryNotification(obj.api_key, (err, notif) => {
                // if (notif) {
                callback(200, { data: notif, isSuccess: true, icon: "success" });
                // } else {
                //   callback(200, { 'data': 0, 'isSuccess': true, 'icon': 'success' });
                // }
              });
            } else {
              callback(500, {
                title: "Access denied",
                message: `User not found`,
                isSuccess: false,
                icon: "error",
              });
            }
          });
        } else {
          callback(500, {
            title: "Access denied",
            message: `Token not found`,
            isSuccess: false,
            icon: "error",
          });
        }
      });

    } else {
      callback(500, {
        title: "Access denied",
        message: `Token access not found`,
        isSuccess: false,
        icon: "error",
      });
    }  
  }else{
    callback(503, {
      title: "Access denied",
      message: `Invalid request`,
      isSuccess: false,
      icon: "error",
    });
  }
};

// reset password processor
userAuth.resetEmail = function (data, callback) {
  let email =
    typeof data.payload.email == "string" ? data.payload.email.trim() : false;
  let device = data.headers["user-agent"];

  if (email) {
    sql.Oauth.getUser(email, function (err, res) {
      if (res.length === 1) {
        sql.Oauth.recovery.query(email, function (err, resu) {
          if (resu.length === 1 || resu.length === 0) {
            sql.Oauth.recovery.delete(email, function (err, rez) {
              if (rez === 1 || rez === 0) {
                sql.Oauth.recovery.insert(
                  email,
                  device,
                  function (err, result) {
                    if (err) {
                      callback(200, {
                        title: "Mail sent successfully",
                        result: res,
                        message: ` We sent instructions to change your password to mail `,
                        isSuccess: true,
                        icon: "success",
                        redirectUrl: ``,
                      });
                      //  console.log('Data insertted');
                    } else {
                      callback(200, {
                        title: "An error occured",
                        message: `Please try again later`,
                        isSuccess: false,
                        icon: "error",
                      });
                      console.log("userAuth.resetEmail => Data not insertted");
                    }
                  }
                );
              } else {
                callback(200, {
                  title: "An error occured",
                  message: `We're have trouble finding the account that matched with <b>${email}</b>`,
                  isSuccess: false,
                  icon: "error",
                });
                console.log(
                  "userAuth.resetEmail => Error in delete functionality"
                );
              }
            });
          } else {
            callback(200, {
              title: "An error occured",
              message: `We're have trouble finding the account that matched with <b>${email}</b>`,
              isSuccess: false,
              icon: "error",
            });
            console.log("userAuth.resetEmail => Error in query functionality");
            console.log("");
          }
        });
      } else {
        callback(200, {
          title: "User not found",
          message: `We're have trouble finding the account that matched with <b>${email}</b>`,
          isSuccess: false,
          icon: "error",
        });
      }
    });
  } else {
    callback(500, {
      title: "Empty Email",
      message: `No email found, Kindly provide your email address`,
      isSuccess: false,
      icon: "error",
    });
  }
};

// Update user Password
userAuth.verifyPassword = function (data, callback) {
  let token =
    typeof data.payload.token == "string" ? data.payload.token.trim() : false;
  let hash =
    typeof data.payload.hash == "string" ? data.payload.hash.trim() : false;
  // let password = typeof(data.payload.password) == 'string' ? data.payload.password.trim() : false;
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  var hashedPassword = helpers.hash(password);

  if (token) {
    if (hash) {
      sql.Oauth.recovery.queryToken(token, function (e, r) {
        if (r.length === 1) {
          sql.Oauth.recovery.queryHash(hash, function (err, res) {
            if (res.length === 1) {
              if (Date.now() < res[0].expire_at) {
                sql.Oauth.changePassword(
                  res[0].userEmail,
                  hashedPassword,
                  function (err, result) {
                    if (result === 1) {
                      sql.Oauth.afterChangePasswordMail(res[0].userEmail);
                      callback(200, {
                        title: "Password Changed",
                        message: `Password has been changed successfully`,
                        isSuccess: true,
                        icon: "success",
                        redirectUrl: "../../user/login",
                      });
                    } else {
                      callback(500, {
                        title: "Error occured",
                        message: `An error occurred while trying to change password, Please try again later`,
                        isSuccess: false,
                        icon: "error",
                      });
                    }
                  }
                );
              } else {
                callback(500, {
                  title: "Link Expired",
                  message: `The Link has already expired, Kindly request for another Link `,
                  isSuccess: true,
                  icon: "error",
                  redirectUrl: "../../user/recovery",
                });
              }
            } else {
              callback(500, {
                title: "Url Error",
                message: `Invalid Hash {${hash}} Querystring Found`,
                isSuccess: true,
                icon: "error",
                redirectUrl: "../../user/recovery",
              });
            }
          });
        } else {
          callback(500, {
            title: "Url Error",
            message: `Invalid Token {${token}} Querystring Found`,
            isSuccess: true,
            icon: "error",
            redirectUrl: "../../user/recovery",
          });
        }
      });
    } else {
      callback(500, {
        title: "Url Error",
        message: `No Hash Querystring Found`,
        isSuccess: true,
        icon: "error",
        redirectUrl: "../../user/recovery",
      });
    }
  } else {
    callback(500, {
      title: "Url Error",
      message: `No Token Querystring Found`,
      isSuccess: true,
      icon: "error",
      redirectUrl: "../../user/recovery",
    });
  }
};

// Get countries Json()
userAuth.getCountry = function (data, callback) {
  // if(data.method != 'get' || data.method != 'GET'){
  sql.getCountries((err, res) => {
    callback(200, res);
  });
  // }else{
  //   callback(400, {'message': 'No data found or invalid request type'});
  // }
};


// Get files with app
userAuth.getFiles = function (req, res) {
  // console.log('We\re good to go');
  // if(data.method == 'post'){
  //   var form = new formidable.IncomingForm();
  //   form.parse(data, function (err, fields, files) {
  //     var oldpath = files.filetoupload.filepath;
  //     var newpath = './' + files.filetoupload.originalFilename;
  //     fs.rename(oldpath, newpath, function (err) {
  //       if (err) throw err;
  //       callback(200, {'msg': 'File successfully'})
  //       // res.write('File uploaded and moved!');
  //       // res.end();
  //     });
  //   });
  // } else {
  //   callback(405, undefined, 'html');
  //  }
  // let file = data.payload.f;
  //     var objlength = {
  //       code : 200,
  //       msg : 'Test run',
  //       something :  "file." + data.headers['content-type'],
  //       FileSystem  : file
  //     }
  //     fs.createWriteStream(`${__dirname}/${file}`);
  // callback(200, objlength);
  // let form=new formidable.IncomingForm(),
  // files=[],
  // fields=[]
  //   form.uploadDir='./'
  //   form.on('field', (field, value)=>{
  //     fields.push([field, value])
  //   })
  //   .on('file', (field, file)=>{
  //     files.push([field, file])
  //   })
  //   .on('end', ()=>{
  //     console.log(files, fields, 'FT here awefwa', __filename)
  //     console.log('Upload terminado ')
  //   })
  //   form.parse(data)
  // let contentLength = parseInt(data.headers['content-length'])
  // if (isNaN(contentLength) || contentLength <= 0 ) {
  // callback(200, data.headers['content-length']);
  // Try to use the original filename
  // let filename = data.headers['filename']
  // if (filename == null) {
  //   filename = "file." + data.headers['content-type'].split('/')[1]
  // }
  //   var objlength = {
  //     code : 200,
  //     msg : 'Test run',
  //     something :  "file." + data.headers['content-type'].split('/')[1]
  //   }
  //   const filestream = fs.createWriteStream(`${__dirname}/${filename}`)
  //   callback(200,  objlength);
  //   filestream.on("error", (error) => {
  //     console.error(error)
  //     callback(400, {status: "error", description: error})
  //   })
  //
  // response.statusCode = 411;
  // response.end(JSON.stringify({status: "error", description: "No File"}))
  // }
  // let files =  data.payload.file;
  // callback(200, files);
  // console.log(files);
  // var form = new formidable.IncomingForm();
  // form.parse(data, function (err, fields, files) {
  //   var oldpath = files.filetoupload.filepath;
  //   var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
  //   callback(200, newpath);
  //   console.log(oldpath);
  // fs.rename(oldpath, newpath, function (err) {
  // if (err) throw err;
  // res.write('File uploaded and moved!');
  // res.end();
  // });
};

// Export the handlers
module.exports = userAuth;
