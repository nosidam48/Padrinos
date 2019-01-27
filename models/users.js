var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("users", {
      first_name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      last_name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // The password cannot be null
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_address: {
          type: DataTypes.STRING,
          allowNull: true
      },
      user_city: {
          type: DataTypes.STRING,
          allowNull: true
      },
      user_state: {
          type: DataTypes.STRING,
          allowNull: true
      },
      user_zip: {
          type: DataTypes.STRING,
          allowNull: true
      },
      admin_status: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: true
      },
      master_admin_status: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: true
      },
  }, {
      freezeTableName: true,
      timestamps: false
  });
  // Creating association for users and kids
  User.associate = function(models) {
    User.belongsToMany(models.kids, {through: "KidsUsers"});
    };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return (password === this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};