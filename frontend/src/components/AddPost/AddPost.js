import React, {useEffect, useState} from 'react';
import "./AddPost.scss"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {addPostPending} from "../../store/actions/posts.actions";
import {connect} from "react-redux";
import Chip from "@material-ui/core/Chip";
import * as uuid from "uuid";
import {useHistory} from "react-router-dom";
import {getUserSelector} from "../../store/selectors/users.selectors";
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';


const AddPost = props => {
    const {loggedUser} = props;
    const history = useHistory();
    useEffect(() => {
        if (loggedUser == null) {
            history.push('/')
        }
    }, [loggedUser]);

    const [postTitle, setPostTitle] = useState(null);
    const [postDesc, setPostDesc] = useState(null);
    const [postImgUrl, setPostImgUrl] = useState(null);
    const [postTags, setPostTags] = useState([]);
    const [tempTag, setTempTag] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const submitPost = (e) => {
        props.addPost({
            title: postTitle,
            description: postDesc,
            imageUrl: postImgUrl,
            tags: postTags,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        })
    };

    const saveTempTag = e => {
        setTempTag({
            id: uuid(),
            value: e,
        });
    };

    const saveTagToArr = e => {
        if (e.key === "Enter" && postTags.length < 5) {
            setPostTags([...postTags, tempTag]);
            setTempTag(null);
        }
    };

    const deleteTag = tag => {
        setPostTags(postTags.filter(_tag => _tag.id !== tag.id))
    };

    return (
        <div className="add-post">
            <h3>Add a new post</h3>
            <form noValidate autoComplete="off" className="add-post-container">
                <TextField className="text-field" id="standard-basic" variant="outlined" label="Title"
                           onChange={e => setPostTitle(e.target.value)}/>
                <TextField className="text-field" id="standard-basic" variant="outlined" label="Description"
                           onChange={e => setPostDesc(e.target.value)}/>
                <TextField className="text-field" id="standard-basic" variant="outlined" label="Image url"
                           onChange={e => setPostImgUrl(e.target.value)}/>
                {postImgUrl != null ? <img src={postImgUrl} alt={postTitle} className="post-image"/> : null}

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
                    Create new post
                </Button>

            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    loggedUser: getUserSelector(state),
});

const mapDispatchToProps = dispatch => ({
    addPost: payload => dispatch(addPostPending(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);