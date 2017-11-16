import React, { Component } from 'react';
import { FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';
import Remove from '../components/Remove';


export default class  PostItem extends Component {
  render() {
      const { post, id, comments } = this.props;
        return (
            <div className="blog-item">
                <h2>{post.title}</h2>
                <h4>{post.subtitle}</h4>
                <p>{post.notes.slice(0,250)}...</p>
                <h6 onClick={()=>{browserHistory.push({
                    pathname:'/post',
                    query: {id: id}
                });
                }}

                >{ comments&&Object.values(comments).filter( i => i.id == id).length } comments</h6>


                <FlatButton  primary={true} label="Read More" onClick={()=>{browserHistory.push({
                    pathname:'/post',
                    query: {id: id}
                });
                }} />
                <Remove id={id} title={post.title}/>
            </div>
      );
  }
}
