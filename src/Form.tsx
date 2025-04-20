const Form = ({ firstName, lastName, gender }) => {
  return (
    <form>
      <label htmlFor='firstName'>First Name:</label>
      <input
        type='text'
        id='firstName'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />

      <label htmlFor='lastName'>Last Name:</label>
      <input
        type='text'
        id='lastName'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />

      <label htmlFor='gender'>Gender:</label>
      <select
        id='gender'
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value='male'>Male</option>
        <option value='female'>Female</option>
        <option value='other'>Other</option>
      </select>
    </form>
  )
}

export default Form
