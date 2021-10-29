const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const Notebook = require('./Notebook');
const NotebookNew = require ('./NotebookNew');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
  
  A list of Notebooks along with an option to create new notebook
*/
class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { loading: false };
  }

  render() {
    const onLoadButtonClick = () => {
      // If we are not already in the process of loading notebooks,
      // start loading more notebooks.
      if(!this.state.loading) {
        this.setState({ loading: true });
        this.props.loadMoreNotebooks(() => {
          this.setState({ loading: false });
        });
      }
    };

    // Function which creates a post component from a post ID
    const createNotebookComponent = (currentNotebook) => {
      /* TODO Section 8: Add code for delete */      
      return (
        <Notebook
          key={currentNotebook.id}
          ///?????????/
          notebook={currentNotebook}
          // time={this.props.time}
          saveNotebook={this.props.saveNotebook}
          deleteNotebook={this.props.deleteNotebook}          
        />
      );
    };

    return (
      <div className="row">
        <div className="neverwrote-notebook">
          {/* Button for writing a new post */}
          <NotebookNew
            createNotebook = {this.props.createNotebook } 
          />

          {/* TODO Section 3: Write code to list all the notebooks */}
            {this.props.posts.visibleNotebooks.map(createNotebookComponent)}

          {/* Button for loading more notebooks */}
          <button className="load notebook button"
            onClick={onLoadButtonClick}
            disabled={this.state.loading}
          >
            {this.state.loading ? 'Loading...' : 'Load more notebooks'}
          </button>
        </div>
      </div>
    );
  }
}


//Connect NotebookList component to redux store
const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    time: state.time
  }),
  createActionDispatchers(notebooksActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;

