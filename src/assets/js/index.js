import darken from 'darken';

const darkmode = new darken({
  toggle: "#toggle",
  variables: {
    "--primary-color": ["#292929", "#ffffff"],
    "--secondary-color": ["#AC9670", "#AC9670"],
    "--side-primary-color": ["#1c1c1c", "#AC9670"],
    "--side-secondary-color": ["#AC9670", "#ffffff"],
    "--temp-color": ["#292929", "#AC9670"]
  }
});
