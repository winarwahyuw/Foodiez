const Favorite = {
  async render() {
    return 'Favorite Restaurant';
  },

  async afterRender() {
    return 'after render';
  },
};

export default Favorite;
