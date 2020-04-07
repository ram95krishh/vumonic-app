
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin'
import { applySpec, path } from 'ramda';

const googleLogin = async () => {
  try {
    const loginData = await GoogleSignin.signIn()
    const { accessToken } = await GoogleSignin.getTokens()
    return { ...loginData, accessToken }
  } catch (error) {
    console.log(error)
    // Known bug in the sdk: Errors thrown are incorrect
    // https://github.com/react-native-community/react-native-google-signin/issues/764
    const cancelled = error.code === '-1'
    if (cancelled) {
      throw new Error('authErrors.GOOGLE_ERRORS.cancelled')
    }
  }
}

const shapeUserData = (userData) => {
  return applySpec({
    firstName: path(['additionalUserInfo', 'profile', 'given_name']),
    lastName: path(['additionalUserInfo', 'profile', 'family_name']),
    email: path(['additionalUserInfo', 'profile', 'email']),
    picture: path(['additionalUserInfo', 'profile', 'picture']),
  })(userData);
}

const firebaseLogin = async ({ idToken, accessToken }) => {
  const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
  const firebaseCredential = await firebase.auth().signInWithCredential(googleCredential)

  return firebaseCredential
}

export default {
  googleLogin,
  firebaseLogin,
  shapeUserData
}