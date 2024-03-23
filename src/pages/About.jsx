import "../index.css";
import sharedmeal from "../images/sharedmeal.jpeg";
import cookingathome from "../images/cookingathome.jpeg";

<<<<<<< HEAD
function About() {
  return (
    <>
      <header></header>
      <main>
        <h1> A little about us: </h1>
        <p>
          You don't need your own food blog to be a food blogger! Bite and Blog
          is here so we can all share our favorite dishes, recipes or tips with
          each other. Feel free to share your dishes from your favorite
          restaurant, recipes from your kitchen at home and beyond. Life is
          cheddar when shared with you!
        </p>
        <div>
          <img src={sharedmeal} alt="Shared Meal" />
          <img src={cookingathome} alt="cooking at home" />
        </div>
      </main>
    </>
  );
=======
function About () {

    return(
        <>
             <main className="wrapper">
             <h1> Why Bite and Blog? </h1>
                <p className="about-text">
                You don't need your own food blog to be a food blogger! Cooking, by nature, is a social act.  
                Sharing meals or recipes with loved ones is a fundamental part of being human. Bite and Blog 
                is here so we can all share our favorite dishes, recipes or tips with each other - what made
                those biscuits so fluffy? We need to know! Feel free to share your dishes from your favorite 
                restaurant, recipes from your kitchen at home and beyond. 
                Life is cheddar when shared with you!
                </p>
                <div>
                <img src={sharedmeal} alt="Shared Meal" />
                <img src={cookingathome} alt="cooking at home" />
                </div>
            </main>
        </>
    )
>>>>>>> development
}

export default About;
