import React, { Component } from 'react';
import axios from "axios";

import { connect } from "react-redux";

class ImageUploader extends Component {
  state = {
    data_uri: null,
    processing: false
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      processing: true
    });
    let imageData = {
      data_uri: this.state.data_uri,
      filename: this.state.filename,
      filetype: this.state.filetype
    }
    this.props.dispatch({type: 'ADD_IMAGE', payload: imageData})
    
  }

  handleFile = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let processing;
    let uploaded;

    if (this.props.image.uploaded_uri) {
      this.setState({ processing: false })
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img className='image-preview' src={this.state.uploaded_uri} alt='Preview of uploaded file'/>
          <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing image, please wait";
    }
    console.log(this.state);
    return (
      <div>
          <label>Upload an image</label>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.image,
})

export default connect(mapStateToProps)(ImageUploader);