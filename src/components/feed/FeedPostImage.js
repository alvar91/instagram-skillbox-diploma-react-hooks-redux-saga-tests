import React from 'react'

export default function FeedPostImage({media, altDescription, classImage, handleOpenPostModal}) {
    return (
        <div>
          <img data-testid="postImage" src={media} onClick={handleOpenPostModal} alt={altDescription} className={classImage} />
        </div>
    )
}
