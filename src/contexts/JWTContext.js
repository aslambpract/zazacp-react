import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isAdmin: false,
  isSubAdmin: false,
  user: null,
};

const handlers = {
  RESET_CART: (state) => {
    return {
      ...state,
      user: { ...state.user, cartCount: 0 },
    };
  },

  INCREMENT_CART: (state, { payload }) => {
    return {
      ...state,
      user: { ...state.user, cartCount: payload },
    };
  },

  DECREMENT_CART: (state, { payload }) => {
    return {
      ...state,
      user: { ...state.user, cartCount: state.user.cartCount - payload },
    };
  },

  SET_PROFILE_IMAGE: (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        user_profile: {
          ...state.user.user_profile,
          profile_image: payload,
        },
      },
    };
  },
  SET_IMAGE: (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        user_profile: {
          ...state.user.user_profile,
          cover_image: payload,
        },
      },
    };
  },
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
      isSubAdmin: JSON.parse(localStorage.getItem("isSubAdmin")),
      user,
    };
  },

  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isAdmin: Boolean(user.is_super_admin),
      isSubAdmin: Boolean(user.is_sub_admin),
      user,
    };
  },

  GET_USER: (state, action) => {
    const {
      scope_email,
      scope_facebook,
      scope_instagram,
      scope_medium,
      scope_phone,
      scope_telegram,
      scope_twitter,
      scope_whatsapp,
      referral_count,
      ...rest
    } = action.payload.user;
    return {
      ...state,
      isAuthenticated: true,
      isAdmin: action.payload.isAdmin,
      isSubAdmin: action.payload.isSubAdmin,
      user: {
        ...rest,
        social: {
          scope_email,
          scope_facebook,
          scope_instagram,
          scope_medium,
          scope_phone,
          scope_telegram,
          scope_twitter,
          scope_whatsapp,
        },
      },
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  getUser: () => Promise.resolve(),
  setImage: () => Promise.resolve(),
  setProfileImage: () => Promise.resolve(),
  incrementCart: () => Promise.resolve(),
  decrementCart: () => Promise.resolve(),
  resetCart: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const user = {};
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password, remember) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("remember", remember);

    try {
      const URL = `${process.env.REACT_APP_HOST_NAME}api/login`;
      const { status, data } = await axios.post(URL, formData);
      if (status === 200) {
        const { access_token, user, message } = data;
        if (!message) {
          localStorage.setItem("isAdmin", Boolean(user.is_super_admin));
          localStorage.setItem("isSubAdmin", Boolean(user.is_sub_admin));
          setSession(access_token);
          dispatch({
            type: "LOGIN",
            payload: {
              user,
            },
          });

          return { status: true, data: user.username };
        } else {
          return { status: false, message };
        }
      }
    } catch (err) {
      return { status: false, message: err.response.data.message };
    }

    return "";
  };

  const register = async (email, username, password, referral) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("referral", referral);

    const response = await axiosInstance.post("api/register", formData);
    const { access_token, user } = response.data;

    window.localStorage.setItem("accessToken", access_token);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const setImage = async (image) => {
    dispatch({ type: "SET_IMAGE", payload: image });
  };

  const logout = async () => {
    try {
      const { status } = await axiosInstance.post("api/logout");
      if (status === 200) {
        setSession(null);
        localStorage.removeItem("isSubAdmin");
        localStorage.removeItem("isImpersonate");
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetPassword = async (reqData) => {
    const data = new FormData();
    data.append("email", reqData.email);
    data.append("password", reqData.password);
    data.append("password_confirmation", reqData.repassword);
    data.append("token", reqData.token);
    try {
      const res = await axiosInstance.post(`/reset-password`, data);
      return res.status === 200;
    } catch (error) {}
  };

  const getUser = async () => {
    try {
      const { status, data } = await axiosInstance.get("api/profile");
      if (status === 200) {
        const {
          user,
          cart_count,
          referral_count,
          balance_amount,
          total_commission,
          total_payout,
          sponsor_info,
        } = data.data;

        const sponsorInfo = {
          name: sponsor_info?.user_profile?.first_name,
          username: sponsor_info?.username,
          country: sponsor_info?.user_profile?.country,
          joinedAt:
            sponsor_info?.created_at &&
            new Date(sponsor_info?.created_at).toLocaleDateString("en-GB"),
        };

        if (user)
          dispatch({
            type: "GET_USER",
            payload: {
              user: {
                ...user,
                cartCount: cart_count,
                referralCount: referral_count,
                balanceAmount: parseInt(balance_amount),
                totalCommission: parseInt(total_commission),
                totalPayout: parseInt(total_payout),
                sponsorInfo,
              },
              isSubAdmin: JSON.parse(localStorage.getItem("isSubAdmin")),
              isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
            },
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setProfileImage = (newUri) => {
    dispatch({ type: "SET_PROFILE_IMAGE", payload: newUri });
  };

  const incrementCart = (cartCount) => {
    dispatch({ type: "INCREMENT_CART", payload: cartCount });
  };

  const decrementCart = () => {
    dispatch({ type: "DECREMENT_CART", payload: 1 });
  };

  const resetCart = () => {
    dispatch({ type: "RESET_CART" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        resetPassword,
        getUser,
        setImage,
        setProfileImage,
        incrementCart,
        decrementCart,
        resetCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
