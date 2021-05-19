/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Style element via CSS-in-JS
const divStyles = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const labelStyles = css`
  font-size: 1.5em;
  font-weight: bold;
`;
const inputStyles = css`
  margin: 20px auto 10px auto;
  height: 30px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  background-color: lightyellow;
  text-align: center;
`;

// Capture user input on location, and change variable state accordingly
// Pass state to other components via destructured props
function UserInputs({ location, setLocation, submitLocation }) {
  return (
    <div css={divStyles}>
      <label htmlFor="location" css={labelStyles}>
        Set weather location:
        <br />
        <input
          id="location"
          placeholder="Vienna"
          value={location}
          onChange={(event) => {
            setLocation(event.currentTarget.value);
          }}
          css={inputStyles}
        />
        <br />
        <button onClick={submitLocation}>Submit</button>
      </label>
    </div>
  );
}

export default UserInputs;
