import React, {useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {editPostPending, getSinglePostPending} from "../../store/actions/posts.actions";
import axios from "axios";
import {HOST} from "../../core/api"
import "./EditPost.scss";
import Chip from "@material-ui/core/Chip";
import * as uuid from "uuid";
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from 'draft-js';
import draftToHtml from "draftjs-to-html";

const EditPost = props => {
    let {id} = useParams();
    const [post, setPost] = useState();
    const [tempTag, setTempTag] = useState(null);
    const [postTags, setTags] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onContentStateChange = blocks => {
        const blocksFromHtml = convertFromHTML(blocks);

        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
    };

    useEffect(() => {
        axios.get(`${HOST}/posts/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
            .then(res => {
                setPost({...res.data});
                setTags(res.data.tags);
                onContentStateChange(res.data.content);
            })
            .catch(e => console.log('Error', e));
    }, []);

    const setPostTitle = e => setPost({...post, title: e.target.value});
    const setPostDescription = e => setPost({...post, description: e.target.value});
    const setPostImageUrl = e => setPost({...post, imageUrl: e.target.value});
    const setPostTags = e => setPost({...post, tags: e});


    const submitPost = (e) => {
        props.editPost({
            ...post,
            tags: postTags,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    };

    const saveTempTag = e => setTempTag(e);

    const saveTagToArr = e => {
        if (e.key === "Enter" && postTags.length < 5) {
            setTags([...postTags, {id: uuid(), value: e.target.value}]);
            setTempTag(null);
        }
    };

    const deleteTag = tag => setTags(postTags.filter(_tag => _tag.id !== tag.id));


    return (
        <div className="edit-post">
            <h3>Edit postD</h3>
            <form noValidate autoComplete="off" className="edit-post-container">
                <TextField className="text-field" id="standard-basic" variant="outlined" label="Title"
                           value={post ? post.title : ''} onChange={e => setPostTitle(e)}/>
                <TextField className="text-field" id="standard-basic" variant="outlined" label="Description"
                           value={post ? post.description : ''} onChange={e => setPostDescription(e)}/>
                <TextField className="text-field" id="standard-basic" variant="outlined" label="Image url"
                           value={post ? post.imageUrl : ''} onChange={e => setPostImageUrl(e)}/>
                {post != null && post.imageUrl != null ?
                    <img src={post.imageUrl} alt={post.title} className="post-image"/> : null}

                <TextField id="standard-basic" label="Tags for post" variant="outlined"
                           onChange={e => saveTempTag(e.target.value)}
                           onKeyPress={e => saveTagToArr(e)} value={tempTag ? tempTag.value : ''}/>

                <div className="tags-container">
                    {postTags != null && postTags.length > 0 ? postTags.map((mappedTag, index) => {
                        return (

                            <Chip key={index} label={mappedTag.value} color="primary"
                                  onDelete={() => deleteTag(mappedTag)}/>

                        )
                    }) : null}
                </div>

                <Editor
                    editorState={editorState}
                    toolbarClassName="html-editor-toolbar"
                    wrapperClassName="html-editor-wrapper"
                    editorClassName="html-editor"
                    onEditorStateChange={editorState => setEditorState(editorState)}
                />
                <br/>
                <Button className="post-button-submit" variant="contained" color="primary" onClick={submitPost}>
                    Save changes
                </Button>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    getSinglePost: payload => dispatch(getSinglePostPending(payload)),
    editPost: payload => dispatch(editPostPending(payload))
});

export default connect(null, mapDispatchToProps)(EditPost);