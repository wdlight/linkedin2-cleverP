import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import PostModal from './PostModal';
import ReactPlayer from 'react-player';

import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../reducers/userReducer"
import { selectloading, selectArticles, setArticles } from "../reducers/articleReducer"
import { auth, db, provider } from "../firebase";

export default function Main() {
const [showModal, setShowModal] = useState("close");

const user = useSelector ( selectUser );
const loading = useSelector ( selectloading );
const articles = useSelector ( selectArticles );

const dispatch = useDispatch();

useEffect( () => {
  console.log ( "article console log calls getArticlesAPI() ");
  getArticles();
},[])

function getArticles(){
  dispatch( getArticlesAPI());
}

function getArticlesAPI () {
  return (dispatch) => {
    
    let payload;    
    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot( (snapshot) => {
        payload = snapshot.docs.map( (doc) => doc.data() );        
        
        dispatch ( setArticles( payload ))        
        console.log("-------------------");
        console.log( articles);



      });
  }
}

  const handleClick = (e) => {    
    e.preventDefault();
    if ( e.target !== e.currentTarget) {
      return;
    }
    switch ( showModal ) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal( "open");
        break;
      default:
        setShowModal("close");
    }
    console.log( "Main click write a post:" + showModal );

  }
  console.log ( " <Content> articles.lenght: " + articles.lenght );
  return (  
    <>
    {
      articles.length === 0 ?
      <p> There are no articles </p>
      :
    <Container>   
      <Sharebox>        
        <div>
        { 
          user && user.photoURL ? (
          <img src={user.photoURL} alt="" />
          ) : (
          <img src="/images/user.svg" alt="" />
          )
        }
          
          <button onClick={handleClick} disabled = { loading ? true : false}>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />            
            <span>Photo</span>
          </button>

          <button>
            <img src="/images/video-icon.svg" alt="" />            
            <span>Video</span>
          </button>

          <button>
            <img src="/images/calendar-icon.svg" alt="" />            
            <span>Event</span>
          </button>

          <button>
            <img src="/images/article-icon.svg" alt="" />            
            <span>Write Article</span>
          </button>
        </div>

      </Sharebox>
      <Content>
        {
          loading && <img src="/images/spinloader.svg"/>
        }
        { 
          
          articles.length > 0 && articles.map( (article, key)=>( 
          <Article key={key}>
            <SharedActor>
              <a>
                <img src={article.actor.image} alt="" />
                <div>
                  <span>{article.actor.title}</span>
                  <span>{article.actor.description}</span>
                  <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                </div>

              </a>
              <button >
                <img src="/images/ellipsis.png"/>
              </button>
              

            </SharedActor>
            <Description>{article.description}</Description>
            <SharedImage>
              <a>
                {
                  !article.shareImg && article.video ? (
                    <ReactPlayer width="100%" url={article.video } />
                  ) : (
                    article.shareImg && <img src={article.shareImg} alt="" />
                  )
                }
                
              </a>
            </SharedImage>

            <SocialCounts>
              <li>
                <button>
                  <img src="/images/like-icon.png" alt="" />
                  <img src="/images/clap-icon.png" alt="" />
                  <span>75</span>
                </button>
              </li>
              <li>
                <a> {article.comments}</a>
              </li>

            </SocialCounts>

            <SocialActions>
              <button>
                  <img src="/images/like-icon.svg" alt="" />
                  <span> Like</span>
                </button>
                <button>
                  <img src="/images/comments-icon.svg" alt="" />
                  <span> Comments</span>
                </button>
                <button>
                  <img src="/images/share-icon.svg" alt="" />
                  <span> Share</span>
                </button>
                <button>
                  <img src="/images/send-icon.svg" alt="" />
                  <span> Send</span>
                </button>
            </SocialActions>
          
          </Article>
        ) ) }
        
      </Content>
      
      <PostModal showModal={showModal} handleClick={handleClick}></PostModal>

    </Container>
    }
    </>
    
  
  )
}

const Container = styled.div`
  grid-area: main;
`;  

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
/* 
  overflow 에 사용할 수 있는 값은 네가지가 있습니다.
- visible : 기본 값입니다. 넘칠 경우 컨텐츠가 상자 밖으로 보여집니다.
- hidden : 넘치는 부분은 잘려서 보여지지 않습니다.
- scroll : 스크롤바가 추가되어 스크롤할 수 있습니다.(가로, 세로 모두 추가 됩니다.)
- auto : 컨텐츠 량에 따라 스크롤바를 추가할지 자동으로 결정됩니다.( 필요에 따라 가로, 세로 별도로 추가될 수도 있습니다.) */

  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb( 0 0 0 /15% ), 0 0 0 rgb( 0 0 0 / 20%);

`;

const Sharebox = styled( CommonCard )`
  display : flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: white;
  div {
    button {
      outline: none;
      color: rgba( 0 ,0,0,0.6 );
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;

      & > img{
        width: 28px;
      }
    }
    &:first-child{
        display: flex;
        align-items: center;
        padding: 8px 16px 0px 16px;
        img {
          width: 48px;
          border-radius: 50%;
          margin-right: 8px;
        }
        button {
          margin: 4px 0;
          flex-grow: 1;
          border-radius: 35px;
          border: 1px solid rgba( 0,0,0,0.15);
          background-color: white;
          text-align: left;
        }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button{
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
        
      }
    }
  }
`

const Article = styled( CommonCard) `
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 48px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a{
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba( 0 ,0,0, 1 );
        }
        &:nth-child(n+1){
          font-size: 12px;
          color: rgba( 0,0,0,0.6 );
        }
      }
    }
    button {
      position: absolute;
      right: 12px;
      top: 0;
      background: transparent;
      border: none;
      outline: none;
    }
  }
  `;


const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba( 0,0,0,0.9 );
  font-size: 14px;
  text-align: left;

`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;


const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white; 
    }
  }
  img {
    width: 16px;
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    background: white;
    & > img {
      height: 26px;
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;

      }      
    }

  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }

`;