/**
 * All url endpoints and a few encoding functions are defined here.
 * URLs should not have a trailing slash here as it is appended automatically
 * by the base service.
 * All URLs stem from the base URL /api/1/
 */
/**

/**
 * Returns the location's hashbang value, excluding the actual hash.
 * @param  {object} location          location object from props
 * @param  {string} defaultValue      Default value if no hash found
 * @return {string}                   The hash value
 */

export function getLocationHash(location, defaultValue = null) {
  return location.hash.replace("#", "") || defaultValue;
}

const URLs = {
  send: "send"
};

export default URLs;
