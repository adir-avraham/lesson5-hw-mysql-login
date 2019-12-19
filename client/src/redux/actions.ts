import Actions from './actions.config'; 




export const userLogin = (userId: any, token: any) => {

  return {
      type: Actions.REGISTER,
      payload: { userId, token }
  }

} 

// export const getUserTokenAction = (userToken: any) => {

//   return {
//       type: Actions.GET_USER_TOKEN,
//       payload: { userToken }
//   }
// }
