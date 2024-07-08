"use client"
import React, { useEffect, useState } from 'react'
import styles from './recipeDetails.module.css'
import MainHeader from '@/app/components/MainHeader';
import Footer from '../../components/Footer';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const RecipeDetailsPage = ({ params }: any) => {
  const router = useRouter();

  const { recipeId } = params;
  const [recipe, setRecipe]: any = useState(null);

  const [comments, setComments]: any = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const [cuisines, setCuisines]: any = useState({});
  const [difficulties, setDifficulties]: any = useState({});
  const [diets, setDiets]: any = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching cuisines
        const cuisineRes = await fetch('http://192.168.1.53:8080/cuisines');
        const cuisineData = await cuisineRes.json();
        const cuisineMap = cuisineData.reduce((acc: any, item: any) => ({ ...acc, [item.id]: item.name }), {});
        setCuisines(cuisineMap);

        // Fetching difficulties
        const difficultyRes = await fetch('http://192.168.1.53:8080/difficulties');
        const difficultyData = await difficultyRes.json();
        const difficultyMap = difficultyData.reduce((acc: any, item: any) => ({ ...acc, [item.id]: item.name }), {});
        setDifficulties(difficultyMap);

        // Fetching diets
        const dietRes = await fetch('http://192.168.1.53:8080/diets');
        const dietData = await dietRes.json();
        const dietMap = dietData.reduce((acc: any, item: any) => ({ ...acc, [item.id]: item.name }), {});
        setDiets(dietMap);

        // Fetching specific recipe details
        const recipeRes = await fetch(`http://192.168.1.53:8080/recipes/${recipeId}`);
        const recipeData = await recipeRes.json();
        setRecipe(recipeData);

        // Fetching comments
        const commentRes = await fetch(`http://192.168.1.53:8080/comments?recipeId=${recipeId}`);
        const commentData = await commentRes.json();
        setComments(commentData);
        calculateAverageRating(commentData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [recipeId]);

  const calculateAverageRating = (comments:any) => {
    const total = comments.reduce((acc:any, curr:any) => acc + curr.rating, 0);
    const average = total / comments.length;
    setAverageRating(average);
  };
 // render average rating with a single star 
 const renderAverageRating = (rating: any) => (
  <div className="bg-[#F9CF00] text-yellow-800 text-xs w-fit font-bold py-1 px-3 rounded-full flex items-center">
    <FaStar className="mr-1" /> {rating.toFixed(1)}/5 Stars
  </div>
);

  const submitComment = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://192.168.1.53:8080/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: newComment,
          rating,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
        setRating(0);
        toast.success('Comment added successfully.', { duration: 3000 });
      } else {
        throw new Error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to add comment.', { duration: 3000 });

    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.recipeDetailsPage}>
      <div className='bg-gray-100 w-full min-h-screen'>
        <MainHeader />
        <div className='flex justify-start items-start'>

          <main className='flex-1 mx-4 rounded-lg p-4 bg-slate-50'>

            {recipe ? (
              <>
                <h1 className="text-3xl font-bold text-center  mt-4 mb-2">{recipe.name} </h1>

                <div className="grid md:grid-cols-3 gap-4">

                  <div className="md:col-span-1">
                    
                    <img src={`http://192.168.1.53:8080${recipe.image}`} alt={recipe.name} className="w-full h-auto rounded-xl shadow-lg p-2" />
                    <button onClick={() => router.back()} className="px-4 w-full py-2 mt-4 mb-2 rounded-xl border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-0.5 duration-200 text-gray-700 font-semibold text-md  hover:shadow-md">
                      Back
                    </button>
                  </div>
                  <div className="md:col-span-2">

                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md space-y-2">
                      
                      <p className="text-lg"><strong className="bg-orange-500 text-gray-700 font-semibold rounded-xl px-2 py-1 mr-2  shadow-md">Cuisine:</strong> {cuisines[recipe.cuisineId]}</p>
                      <p className="text-lg"><strong className="bg-[#95CD41] text-gray-700  font-semibold rounded-xl px-2 py-1 mr-2  shadow-md">Difficulty:</strong> {difficulties[recipe.difficultyId]}</p>
                      <p className="text-lg"><strong className="bg-[#e9b000] text-gray-700 font-semibold rounded-xl px-2 py-1 mr-2  shadow-md">Diet:</strong> {diets[recipe.dietId]}</p>
                      <h2 className="text-xl font-bold flex gap-2">Average Rating:{renderAverageRating(averageRating)}</h2>
           
                    </div>

                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md space-y-3">
                      <h2 className="bg-[#95CD41] w-fit text-gray-700 text-lg font-semibold rounded-xl px-2 py-0.5 mr-2  shadow-md">Ingredients:</h2>
                      <ul className="list-disc pl-5 mt-2">
                        {recipe.ingredients && recipe.ingredients.map((ingredient: any, index: any) => (
                          <li key={index} className="text-lg">{ingredient}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded-lg shadow-md space-y-3">
                      <h2 className="bg-orange-500 w-fit text-gray-700 text-lg font-semibold rounded-xl px-2 py-1 shadow-md">Instructions:</h2>
                      <p className="whitespace-pre-line text-lg">{recipe.instructions}</p>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold">Comments:</h2>
                      {comments.length > 0 ? comments.map((comment: any) => (
                        <div key={comment.id} className="mt-2 p-2 bg-white rounded-lg flex">
                          {/* Profile picture placeholder */}
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                          <div className="flex flex-col flex-grow ml-4">
                            <p className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                            <p className="text-md mt-1">{comment.comment}</p>
                            {/* Star Rating */}
                            <div className="bg-[#F9CF00] w-fit text-yellow-800 text-xs font-bold py-1 px-3 rounded-full flex items-center mt-1">
                              <FaStar className="mr-1" />
                              {comment.rating}/5 Stars
                            </div>
                          </div>
                        </div>
                      )) : <p>No comments yet.</p>}

                      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-2xl font-semibold">Add Your Comment:</h2>
                        <div className="flex flex-col space-y-3">
                          <textarea
                            className="form-textarea mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                          ></textarea>
                          <div className="flex items-center">
                            <h2 className="text-md m-2">Rate: </h2>
                            {[1, 2, 3, 4, 5].map((index) => (
                              <FaStar
                                key={index}
                                size={25}
                                style={{ cursor: 'pointer' }}
                                color={index <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9'}
                                onMouseEnter={() => setHoverRating(index)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(index)}
                              />
                            ))}
                          </div>
                          <button onClick={submitComment} disabled={isSubmitting} className="px-4 w-full py-2 mt-4 mb-4 rounded-md border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-1 duration-200 text-gray-700 font-semibold text-md  hover:shadow-md">
                            Submit Comment
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            ) : (
              <p className="text-center text-xl mt-20">Loading...</p>
            )}



          </main>
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default RecipeDetailsPage