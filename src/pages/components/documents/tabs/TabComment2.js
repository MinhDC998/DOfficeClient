import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentServices from '../../../../services/comment.services'
import Comments from '../comment/Comments';

function TabComment2({ versionId }) {
  
  const {user} = useSelector(state => state.authentication) 

  return (
      <>
            <Comments 
                versionId={versionId}
                currentUserId={user.id}
            />      
      </>
  )
}
export default TabComment2;
