(function () {
  var CommentRootList = React.createClass({
    componentDidMount: function () {
      Promise.resolve($.ajax({
        url: './comments.json',
        dataType: 'json'
      })).then(function (response) {
        var captions = Immutable.fromJS(response).getIn(['data', 'captions']);
        this.setState({
          captions: captions
        });
      }.bind(this));
    },

    getInitialState() {
      return {
        captions: Immutable.List()
      };
    },

    getRoots: function () {
      return this.state.captions.filter(function (caption) {
        return !caption.get('parent_id');
      });
    },

    render: function () {
      return <CommentList items={this.getRoots()} captions={this.state.captions}/>;
    }
  });

  window.CommentRootList = CommentRootList;
})();
