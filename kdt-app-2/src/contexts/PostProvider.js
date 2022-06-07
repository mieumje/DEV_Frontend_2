import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_POSTS": {
      return action.payload;
    }
    case "ADD_POST": {
      return [...state, action.payload];
    }
    case "DELETE_POST": {
      const payload = action.payload;
      return state.filter((item) => item.id !== payload.id);
    }
    default: {
      console.error("Wrong Type");
      break;
    }
  }
};

const PostProvider = ({ children, initialPosts, handleDeletePost }) => {
  const [posts, dispatch] = useReducer(reducer, initialPosts || []); // useState와 유사

  useEffect(() => {
    dispatch({ type: "INIT_POSTS", payload: initialPosts || []});
  }, [initialPosts]);

  const onDeletePost = useCallback(async (id) => {
    const payload = await handleDeletePost(id);
    dispatch({ type: 'DELETE_POST', payload });
  }, [handleDeletePost]);

  return (
    <PostContext.Provider value={{ posts, onDeletePost }}>
      {children}
    </PostContext.Provider>
  )
};

export default PostProvider;