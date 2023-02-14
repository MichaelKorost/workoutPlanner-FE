import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
function Test() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <div>test main page</div>

      {user ? (
        <button onClick={onLogout}>Log me out</button>
      ) : (
        <button>no user </button>
      )}
    </>
  );
}

export default Test;
