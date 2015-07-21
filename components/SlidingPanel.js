(function () {
  var SlidingPanel = React.createClass({
    componentWillEnter: function (callback) {
      var element = React.findDOMNode(this);
      $.Velocity(element, 'slideDown', this.props.options.toJS()).then(callback);
    },

    componentWillLeave: function (callback) {
      var element = React.findDOMNode(this);
      $.Velocity(element, 'slideUp', this.props.options.toJS()).then(callback);
    },

    componentWillUnmount: function () {
      var element = React.findDOMNode(this);
      $.Velocity(element, 'stop');
    },

    getDefaultProps: function () {
      return {
        options: Immutable.fromJS({
          duration: 100,
          easing: 'ease-out'
        })
      };
    },

    render: function () {
      return <div className={this.props.className}>
        {this.props.children}
      </div>;
    }
  });

  window.SlidingPanel = SlidingPanel;
})();
