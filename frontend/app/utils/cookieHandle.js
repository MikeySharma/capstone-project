'use client';

function getCookie(key) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const [cookieKey, cookieValue] = cookies[i].split('=');
      if (cookieKey === key) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null; // Return null if the key is not found
  }

  function deleteCookie(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  

export  {getCookie, deleteCookie};