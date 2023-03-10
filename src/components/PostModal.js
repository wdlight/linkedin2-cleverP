import React, {useState} from 'react'
import styled from 'styled-components';
import ReactPlayer from "react-player";

import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../reducers/userReducer"
import { db, storage, firebaseApp } from '../firebase';
import firebase from 'firebase/compat/app';

import { setLoading } from '../reducers/articleReducer';

function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const user = useSelector ( selectUser );

  const handleChange = (e) => {
    const image = e.target.files[0];
    if ( image === "" || image ==="undefined"){
      alert ( `not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  }

  const switchAssetArea = (area) =>{
    setShareImage("");
    setVideoLink('');
    setAssetArea(area);
  }

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink('');
    setAssetArea("");

    props.handleClick(e);
  }
  console.log ( "Modal" + props.showModal);

  // Post Image to firebase
  const dispatch = useDispatch();
  function postArticleAPI(payload) {
    
      console.log ( "postArticle" ) ;
      
      dispatch( setLoading(true) );

      if ( payload.image !== "" ){
        // image uploading..
        const upload = 
          storage
          .ref(`images/${payload.image.name}`)
          .put(payload.image);
        upload.on(
          "state_changed",
          // 2nd param : 변화 시에 동작하는 함수
          (snapshot) =>{
            const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log( `Progress: ${progress}%`);
            if ( snapshot.state =="RUNNING"){
              console.log(`Progress: ${progress}%`)
            }
          },
          // 3rd Error
          (error) => console.log( error.code),
          // 4th param. 성공시에 동작함수.
          async () => {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            db.collection("articles").add ( {
              actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video,
              shareImg: downloadURL,
              comments: 0,
              description: payload.description
            });
            dispatch  ( setLoading(false));
    
          }
        )
      } else if ( payload.video){
        db.collection("articles").add ( {
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          shareImg: "",
          comments: 0,
          description: payload.description
        });
        dispatch  ( setLoading(false));
      }

      
     
  }

  const postArticle = e =>{
    e.preventDefault();
    if ( e.target !== e.currentTarget)
      return;
    const payload = {
      image: shareImage,
      video: videoLink,
      user: user,
      description: editorText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    postArticleAPI( payload);
    reset(e);
  }

  return (
    <>
    { 
      props.showModal === "open" && 
      <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={ (event) => {reset(event)}}>
            {/* <img src="/images/close-icon.svg" alt="" /> */}
            X
          </button>
        </Header>
        <SharedContent>
          <form>
          <UserInfo>
            { user.photoURL ? (<img src={user.photoURL} alt="" /> ) 
                            : (<img src="/images/user.svg" alt="" />)
            }
            <span>{user.displayName}</span>
            
          </UserInfo>
          <Editor>            
            <textarea name="
            " id="" cols="30" rows="10"
            value={editorText}
            placeholder ="What do you want to talk about?"
            onChange={ (e) => setEditorText(e.target.value)}
            />
            {assetArea === "image" ? ( 
              <UploadImage>
              <input type="file" accept='image/gif, image/jpeg, image/png'
              name="image"
              id="file"
              style={{display:"none"}}
              onChange={handleChange}
              />
              <p>
                <label htmlFor="file"
                >Select an image to share</label>
              </p>
              {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
              
              
              </UploadImage>
            ) : (
              assetArea === "media" &&
              <>
                <input
                  type="text"
                  placeholder = "Please input a video Link"
                  value={videoLink}
                  onChange={(e)=> setVideoLink( e.target.value)}
                />
                {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
              </>
            )}
           
          </Editor>        
          </form>  
        </SharedContent>
        <SharedCreate>
          <AttachAssets>
            <AssetButton onClick={ ()=> switchAssetArea("image")}>
              <img src="/images/share-icon.svg" alt="" />
            </AssetButton>
            <AssetButton onClick={ ()=> switchAssetArea("media")}>
              <img src="/images/video-icon.svg" alt="" />
            </AssetButton>
          </AttachAssets>
          <ShareComment>
          <AssetButton>
              <img src="/images/comments-icon.svg" alt="" />
            </AssetButton>
          </ShareComment>

          <PostButton disabled= {!editorText ? true : false}
            onClick={ (e) => postArticle(e)}>
            Post
          </PostButton>
        </SharedCreate>
      </Content>
      </Container>
    }
    </>   
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;  // take entire browser.
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba( 0,0,0, 0.8);
  /* animation: fadeIn 0.5s;   */
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba( 0,0,0, 0.15 );
  font-size: 16px;
  line-height: 1.5;
  color: rgba( 0,0,0, 0.6 );
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba( 0,0,0, 0.5 );
    img,
    svg {      
      pointer-events: none;
    }

  }

`;

const SharedContent = styled.div`
  display:flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px, 12px;
`;

const UserInfo = styled.div`
  display:flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreate = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px
`;


const AssetButton = styled.button `
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba( 0,0,0, 0.5 );
  img,svg {
    height: 20px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 100px;
  }
  
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgb( 0,0,0, 0.15 );
  ${AssetButton}{
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  /* background-color: ${ (props) => (props.disabled ? " rgba(0,0,0,0.8) " : "#0a66c2")}; */
  /* color: ${(props)=> (props.disabled ? "rgba(1,1,1,0.2" : "white")}; */
  font-weight: 400;
  &:hover {
    /* background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08" : "#004182")}; */
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal