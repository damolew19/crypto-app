const transitionStates = {
  fadeOut: (componentName: any) => {
    document.querySelector(componentName).classList.remove('show');
  },

  fadeIn: (componentName: any) => {
    document.querySelector(componentName).classList.add('show');
  },
};
export default transitionStates;
