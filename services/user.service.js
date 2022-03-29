const {
    generateMeAToken,
    comparePassword
} = require('../helpers/auth.helpers');
const ROLES = require('../helpers/user.validation').roles;


const register = (User) => async (user) => {
  const _user = new User(user);
  try {
    const result = await _user.save();
    if (result) {
      return {
        status: "success",
        message: "Utilisateur enregistré avec succès",
        payload: result,
      };
    }
  } catch (error) {
    return {
      status: "fail",
      message: "l'utilisateur ne parvient pas à s'inscrire",
      payload: error,
    };
  }
};

const authenticate = User => async (email, password) => {
    try {
      const user = await User.findOne({
        email: email,
      });
      if (comparePassword(password, user.password)) {
        const token = generateMeAToken(user);
        return {
          status: "success",
          message: "Utilisateur authentifié avec succès !!!",
          payload: {
            user: user.toJSON(),
            token: token,
          },
        };
      } else {
        return {
          status: "error",
          message: "Email ou mot de passe invalide !!!",
          payload: null,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: "l'Utilisateur ne peut pas s'authentifier",
        payload: null,
      };
    }
};

const getUserById = (User) => async (id) => {};

const updateUser = (User) => (id, newUser) => {};

const deleteUser = (User) => async (id) => {};

module.exports = (User) => {
  return {
    register: register(User),
    authenticate: authenticate(User),
    getUserById: getUserById(User),
    updateUser: updateUser(User),
    deleteUser: deleteUser(User),
  };
};
