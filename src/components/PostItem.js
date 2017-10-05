import React, { Component } from 'react';
import { FlatButton } from 'material-ui';
import { browserHistory } from 'react-router';
import Remove from '../components/Remove';


export default class  PostItem extends Component {
  render() {
      const { post, id } = this.props;
        return (
            <div>
                <h2>{post.title}</h2>
                <h4>{post.subtitle}</h4>
                <p>{post.notes.slice(0,250)}...</p>

                <FlatButton  primary={true} label="Read More" onClick={()=>{browserHistory.push({
                    pathname:'/post',
                    query: {id: id}
                })
                }} />
                <Remove id={id} title={post.title}/>
            </div>
      )
  }
}
