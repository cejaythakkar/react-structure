import { get } from '../../lib/http/http-service';

// get grid data for specific page
export const getEmployeeData = () => {
  return get('v1/employees')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export default {};
