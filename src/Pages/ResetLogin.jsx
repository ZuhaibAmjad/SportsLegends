import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ResetLogin() {
 

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="shadow-lg max-w-2xl p-3">
        <h1 className="text-center text-blue-400 my-2">Reset login</h1>
        <h1 className="text-sm">
          Please enter the email of the account you need to reset.
        </h1>
        <div class="col-auto my-3 p-2">
          <label class="sr-only" for="inlineFormInputGroup">
            Username
          </label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text rounded-0">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 p-2" />
              </div>
            </div>
            <input
              type="text"
              class="form-control rounded-0"
              id="inlineFormInputGroup"
              placeholder="your@email.address"
            />
          </div>
        </div>
        <div className="text-blue-400">
        <button className="w-full text-white bg-blue-400 p-3 mb-3">Log In</button>
        <Link to="/" >
          Back To Login Page
        </Link>
        </div>
      </div>
    </div>
  );
}
