import React from "react";

const LoginTable = () => {
  return (
    <div className="">
      <table className="table table-hover table-sm ">
        <tbody className="text-center table-bordered">
          <tr>
            <td>
              {" "}
              <strong>nom d'utilisateur</strong>
            </td>
            <td>
              {" "}
              <strong>mot de passe</strong>
            </td>
          </tr>
          <tr>
            <td>staff</td>
            <td>staff</td>
          </tr>
          <tr>
            <td>admin</td>
            <td>admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoginTable;
