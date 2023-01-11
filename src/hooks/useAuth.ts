import {useAppSelector} from "./useCustomRTKSelectors"

const useAuth = () => {
  const user = useAppSelector(state => state.user)
  const {id, firstName, username, isAuth, email, token, image} = user
  return {id, firstName, username, isAuth, email, token, image}
}
export default useAuth

