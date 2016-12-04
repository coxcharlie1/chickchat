import React, {PropTypes} from "react"
import {connect} from "react-redux"
import attachImage from "src/util/attachImage"

export class ReplyBox extends React.Component {
    onAttachImage = attachImage.bind(this) /*taking a function to attach image bound to ReplyBox*/
    state = {
        text: ""
    }

    updateText = (e) => {
        this.setState({text: e.target.value})
    }

    sendReply = () => {
        this.props.replyText(this.state.text)
        this.setState({text: ""})
    }
    sendImage = () =>{
      this.props.replyImage(this.state.data)
      this.setState({data: ""})
    }

    render () {
        return (
            <div>
              <input value = {this.state.text} onChange={this.updateText}
                  onKeyPress={(e) =>{
                    if(e.key === "Enter"){
                      this.sendReply()
                    }
                  }
              } />
              <button onClick= {this.sendReply}> sendReply  </button>

              <input type="file" onChange={this.onAttachImage} />
              <button onClick={this.sendImage}>Upload image </button>

                {/* Exercise 2: Render a text input and a button */}

            </div>
        )
    }
}

ReplyBox.propTypes = {
    replyImage: PropTypes.func,
    replyText: PropTypes.func
}

export default connect(undefined, {
    replyText: (text) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {text}
    }),
    replyImage: (data) => ({
        type: "REPLY",
        apiEndpoint: "chatPOST",
        payload: {data}
    })
})(ReplyBox)
