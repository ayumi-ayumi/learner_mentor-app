import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/AddMyself.scss";
import { db, userCollection,} from "../firebase";
import { collection, addDoc, getDoc, doc, getDocs, onSnapshot } from "firebase/firestore"; 


export default function AddMyself() {

  const [users, setUsers] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Store the user data when clicking the submit button
  const onSubmit = (data) => {
    addDoc(collection(db, "userCollection"), data)
    console.log(data)
  };
  console.log(errors);


  //Obtain data from firebase
  React.useEffect(()=>{
    const userCollection = getDocs(collection(db, "userCollection"));
    userCollection.then(snap => setUsers(snap.docs.map((doc)=>({...doc.data()}))))
    
    /* リアルタイムで取得 */
    // onSnapshot(userCollection, (snap) => {
      //   // console.log(querySnapshot.docs);
      //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })));
      // });
    }, [])



  return (
    <>
    <div> 
    {users.map((user) => (
      <p>{user.name}</p>
        ))}
    </div>
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 1. Learner or Mentor */}
        <div className="input-container">
          <fieldset>
            <legend>Are you a learner or mentor?</legend>
            <input
              type="radio"
              value="Learner"
              id="learner"
              {...register("learnerOrMentor", {
                required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="learner">Learner</label>

            <input
              type="radio"
              value="Mentor"
              id="mentor"
              {...register("learnerOrMentor", {
                required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="mentor">Mentor</label>
          </fieldset>
        </div>

        {/* 2. Name */}
        <div className="input-container">
          <label htmlFor="name">Your name?</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Tell me your name" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* 3. Location */}
        {/* <select {...register("Title", )}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select> */}
        {/* 4. What do you currently learn? select*/}
        <div className="input-container">
          <legend>What do you currently learn?</legend>
          <input
            {...register("whatToLearn")}
            type="checkbox"
            value="HTML&CSS"
            id="htmlAndCss"
          />
          <label htmlFor="htmlAndCss">HTML&CSS</label>
          <input
            {...register("whatToLearn")}
            type="checkbox"
            value="JavaScript"
            id="javascript"
          />
          <label htmlFor="javascript">JavaScript</label>
          <input
            {...register("whatToLearn")}
            type="checkbox"
            value="Python"
            id="python"
          />
          <label htmlFor="python">Python</label>
          <input
            {...register("whatToLearn")}
            type="checkbox"
            value="React"
            id="react"
          />
          <label htmlFor="react">React</label>
          <input
            {...register("whatToLearn")}
            type="checkbox"
            value="TypeScript"
            id="typescript"
          />
          <label htmlFor="typescript">TypeScript</label>
          <input
            {...register("whatToLearn")}
            type="checkbox"
            value="PHP"
            id="php"
          />
          <label htmlFor="php">PHP</label>
        </div>

        {/* 5. Skill level "How long have you learned?" radio ['Never','Less than 3 monts', '3-6 months', '6-12 months', 'Over 1 year']*/}
        <div className="input-container">
          <fieldset>
            <legend>How long have you learned?</legend>
            <input
              type="radio"
              value="never"
              id="never"
              {...register("howLongLearned", {
                // required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="never">Never</label>

            <input
              type="radio"
              value="lessThan3Months"
              id="lessThan3Months"
              {...register("howLongLearned", {
                // required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="lessThan3Months"> &lt; 3 months</label>

            <input
              type="radio"
              value="3To6Months"
              id="3To6Months"
              {...register("howLongLearned", {
                // required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="3To6Months">3 - 6 months</label>

            <input
              type="radio"
              value="moreThan6Months"
              id="moreThan6Months"
              {...register("howLongLearned", {
                // required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="moreThan6Months">&gt; 6 months</label>

            <input
              type="radio"
              value="over1Year"
              id="over1Year"
              {...register("howLongLearned", {
                // required: "Choose learner or mentor",
              })}
            />
            <label htmlFor="over1Year">&gt; 1 year</label>
          </fieldset>
        </div>

        {/* 6. Languages to speak select*/}
        <div className="input-container">
          <legend>Which Language do you speak?</legend>
          <input
            {...register("languageToSpeak")}
            type="checkbox"
            value="English"
            id="english"
          />
          <label htmlFor="english">English</label>
          <input
            {...register("languageToSpeak")}
            type="checkbox"
            value="Spanish"
            id="spanish"
          />
          <label htmlFor="spanish">Spanish</label>
          <input
            {...register("languageToSpeak")}
            type="checkbox"
            value="French"
            id="french"
          />
          <label htmlFor="french">French</label>
          <input
            {...register("languageToSpeak")}
            type="checkbox"
            value="Chinese"
            id="chinese"
          />
          <label htmlFor="chinese">Chinese</label>
          <input
            {...register("languageToSpeak")}
            type="checkbox"
            value="German"
            id="german"
          />
          <label htmlFor="german">German</label>
          <input
            {...register("languageToSpeak")}
            type="checkbox"
            value="Italian"
            id="italian"
          />
          <label htmlFor="italian">Italian</label>
        </div>
        {/* 7. Want to meet in person or online select */}
        <div className="input-container">
          <legend>Do you want to meet in person or online?</legend>
          <input
            {...register("inPersonOrOnline")}
            type="checkbox"
            value="In person"
            id="inPerson"
          />
          <label htmlFor="inPerson">In person</label>
          <input
            {...register("inPersonOrOnline")}
            type="checkbox"
            value="Online"
            id="online"
          />
          <label htmlFor="online">Online</label>
        </div>

        {/* <input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          placeholder="Mobile number"
          {...register("Mobile number", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        <select {...register("Title", { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>

        <input
          {...register("Developer", { required: true })}
          type="radio"
          value="Yes"
        />
        <input
          {...register("Developer", { required: true })}
          type="radio"
          value="No"
        /> */}

        <input type="submit" value="Add Me!" />
      </form>
    </div>

    </>
  );
}
