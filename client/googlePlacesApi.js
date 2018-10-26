export const googlePlacesAutoComplete = (data, resolve, reject) => {
  if (data) {
    const requestInputValue = {
      input: data,
    };
    const service = new google.maps.places.AutocompleteService();

    const displaySuggestions = function (predictions, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return reject(status);
      }
      return resolve(predictions);
    };

    return service.getPlacePredictions(requestInputValue, displaySuggestions);
  }
  return reject('missing input');
};