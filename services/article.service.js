


const addNewArticle = (Article) => async (article) => {
    const _article = new Article(article);
    try {
      const result = await _article.save();
      if (result) {
        return {
          status: "success",
          message: "Article enregistré avec succès",
          payload: result,
        };
      }
    } catch (error) {
      return {
        status: "fail",
        message: "Enregistrement de l'article a échoué",
        payload: error,
      };
    }
  };

 const getNonFeaturedArticles = (Article)=>async ()=> {
     try {
        const result = await Article.find({'featured': false});
        if (result) {
          return {
            status: "success",
            message: "Désolée merci de se conneccter",
            payload: result,
          };
        }
      } catch (error) {
        return {
          status: "fail",
          message: "Sorry",
          payload: error,
        };
      }
 }
 
 const getFeaturedArticles = (Article)=>async ()=>{
    try {
        const result = await Article.find({'featured': true});
        if (result) {
          return {
            status: "success",
            message: "Tous les articles sont dispo",
            payload: result,
          };
        }
      } catch (error) {
        return {
          status: "fail",
          message: "Sorry",
          payload: error,
        };
      }
}

  module.exports = (Article) => {
    return {
      addNewArticle: addNewArticle(Article),
      getFeaturedArticles: getFeaturedArticles(Article),
      getNonFeaturedArticles: getNonFeaturedArticles(Article)
    //   authenticate: authenticate(Article),
    //   getUserById: getUserById(Article),
    //   updateUser: updateUser(Article),
    //   deleteUser: deleteUser(Article),
    };
  };