import { useNavigate,useParams } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const match  = {params: useParams()};
    return (
      <Component
        navigate={navigate}
        {...props}
        match = {match}
        />
    );
  };
  
  return Wrapper;
};