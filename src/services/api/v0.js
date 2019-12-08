import wretch from "wretch"

export const authenticate = (emailAddress, password) => {
  return wretch(window.__env.serverUrl + "/api/v0/authenticateUser")
    .post({
      emailAddress,
      password,
    })
    .json((response) => {
      return response
    })
}

export const getProjectsForEmployee = (employeeID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getProjectsForEmployee")
    .post({
      employeeID: Number(employeeID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getProjectsForEmployee: ", response)
        return response.projects
      }

      return response
    })
}

export const getParcel = (parcelID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getParcel")
    .post({
      parcelID: Number(parcelID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getParcel: ", response)
        return response.parcel
      }

      return response
    })
}

export const getProject = (projectID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getProject")
    .post({
      projectID: Number(projectID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getProject: ", response)
        return response.project
      }

      return response
    })
}

export const getTitle = (titleID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getTitle")
    .post({
      titleID: Number(titleID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getTitle: ", response)
        return response.title
      }

      return response
    })
}

export const getTitlesForPacel = (employeeID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getTitlesForPacel")
    .post({
      employeeID: Number(employeeID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getTitlesForPacel: ", response)
        return response.projects
      }

      return response
    })
}

export const getParcelsForProject = (employeeID, projectID) => {
  return wretch(window.__env.serverUrl + "/api/v0/getParcelsForProject")
    .post({
      employeeID: Number(employeeID),
      projectID: Number(projectID),
    })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getParcelsForProject: ", response)
        return response.parcels
      }

      return response
    })
}

export const getStatesWithParcels = () => {
  return wretch(window.__env.serverUrl + "/api/v0/getStatesWithParcels")
    .post({})
    .json((response) => {
      if (response.isSuccess) {
        console.log("getStatesWithParcels: ", response)
        return response.states
      }

      return response
    })
}

export const getStateCountiesWithParcels = (stateCode) => {
  return wretch(window.__env.serverUrl + "/api/v0/getStateCountiesWithParcels")
    .post({ stateCode })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getStateCountiesWithParcels: ", response)
        return response.counties
      }

      return response
    })
}

export const getTitlesForCounty = (county) => {
  return wretch(window.__env.serverUrl + "/api/v0/getTitlesForCounty")
    .post({ county })
    .json((response) => {
      if (response.isSuccess) {
        console.log("getTitlesForCounty: ", response)
        return response.titles
      }

      return response
    })
}

// getStateCountiesWithParcels
