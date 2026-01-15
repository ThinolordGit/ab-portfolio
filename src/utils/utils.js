
/**
 * Filtre un tableau d'objets basé sur une clé spécifique et une valeur de recherche.
 * Cette fonction retourne un **nouveau tableau filtré** où chaque élément contient
 * la valeur recherchée dans le champ spécifié.
 *
 * @function searchByKey
 * @param {Array} array - Le tableau d'objets à filtrer.
 * @param {string} key - La clé de l'objet sur laquelle effectuer la recherche (ex: 'name', 'id').
 * @param {string} value - La valeur à rechercher dans la clé spécifiée. La recherche est insensible à la casse.
 * 
 * @returns {Array} Un nouveau tableau contenant uniquement les éléments qui correspondent à la recherche.
 * 
 * @example
 * const data = [
 *   { id: 1, name: "John Doe" },
 *   { id: 2, name: "Jane Doe" },
 *   { id: 3, name: "John Smith" }
 * ];
 *
 * const result = searchByKey(data, 'name', 'john');
 * console.log(result); // [{ id: 1, name: "John Doe" }, { id: 3, name: "John Smith" }]
 * 
 * // Cas où la recherche par valeur "*" retourne le tableau entier
 * const result = searchByKey(data, 'name', '*');
 * console.log(result); // [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }, { id: 3, name: "John Smith" }]
 */
function searchByKey(array, key, value) {
    // Si la clé ou la valeur sont vides ou égales à "*", retourner une copie de l'array
    if (!key || !value || key === "*" || value === "*") return [...array];
    
    // Utilisation de filter pour créer un nouveau tableau avec les éléments filtrés
    return array.filter(item => {
        // Vérifie si l'élément à cette clé existe
        const field = item[key];
        // Vérifie si la valeur contient la chaîne recherchée (insensible à la casse)
        return field != null && field.toString().toLowerCase().includes(value.toString().toLowerCase());
    });
}

/**
 * Checks if a key exists in an array of single-key objects.
 *
 * @param {Array<Object>} list - Array of objects to search through.
 * @param {string} keyToCheck - Key to check for existence.
 * @returns {boolean} - Returns true if the key exists, false otherwise.
 *
 * @example
 * const myList = [
 *   { key1: "value1" },
 *   { key2: "value3" },
 *   { key3: "value3" }
 * ];
 *
 * console.log(doesKeyExist(myList, "key1")); // true
 * console.log(doesKeyExist(myList, "key4")); // false
 */
function doesKeyExist(list, keyToCheck) {
  if (!Array.isArray(list)) {
    throw new TypeError("Expected an array of objects");
  }
  if (typeof keyToCheck !== "string") {
    throw new TypeError("Key must be a string");
  }

  return list.some(item => Object.prototype.hasOwnProperty.call(item, keyToCheck));
}


/**
 * Recherche dans un tableau avec une syntaxe façon MySQL LIKE
 * Supporte :
 * - % pour wildcard (0+ caractères)
 * - _ pour un seul caractère
 */
function searchByKeyLike(array, key, pattern) {
    if (!key || !pattern || key === "*" || pattern === "*") return [...array];

    // Convertit le pattern MySQL LIKE en regex JS
    // - %  -> (.*)
    // - _  -> (.)
    const regexPattern = pattern
        .replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&') // échappe les caractères spéciaux regex
        .replace(/%/g, '.*')                    // % = wildcard
        .replace(/_/g, '.');                    // _ = un caractère
    
    const regex = new RegExp(`^${regexPattern}$`, "i"); // ^ et $ pour match complet
    
    return array.filter(item => {
        const field = item[key];
        if (field == null) return false;
        return regex.test(field.toString());
    });
}

// /**
//  * Recherche LIKE SQL multi-path avec support wildcard "*"
//  * keyVal (array [key value]) : [{key:"key1",value:"value1"},...]
//  * operator : "or" (défaut) ou "and" → combine les clés
//  */
// function searchByKeysLikeDeep(data, keyVal=[{key: "",value: ""}], operator = "or") {
//     if (isEmptyObject(data)) {
//       return [...data];
//     }
//     // console.log(keyVal)
//     const keys = [];
//     const searchValues = [];
    
//     for (let kv of keyVal ) {
//       if ( kv.value && kv.value !== undefined) {
//         keys.push(kv.key);
//         searchValues.push(kv.value);
//       }
//     }
//     // console.log(keys,searchValues)
//     if (isEmptyObject(keys)) {
//       return [...data];
//     }
//     // Normalise (accents, lower case)
//     const normalize = (str, removeAccents = true) => {
//         if (str == null) return "";
//         let s = str.toString().toLowerCase();
//         if (removeAccents) {
//             s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//         }
//         return s;
//     };

    
//     const matches = (field, search) => {
//         if (field == null) return false;

//         if (["string", "number", "boolean"].includes(typeof field)) {
//             return normalize(field).includes(search);
//         }

//         if (Array.isArray(field)) {
//             return field.some(v => matches(v, search));
//         }

//         if (typeof field === "object") {
//             return Object.values(field).some(v => matches(v, search));
//         }

//         return false;
//     };

//     const getByWildcardPath = (obj, parts, index = 0) => {
//         if (obj == null) return [];
        
//         if (Array.isArray(obj)) {
//             return obj.flatMap(el => getByWildcardPath(el, parts, index));
//         }

//         if (index >= parts.length) {
//             return [obj];
//         }

//         const part = parts[index];

//         if (part === "*") {
//             if (typeof obj !== "object" || obj == null) return [];
//             return Object.values(obj).flatMap(child =>
//                 getByWildcardPath(child, parts, index + 1)
//             );
//         }

//         return getByWildcardPath(obj[part], parts, index + 1);
//     };
    
//     return data.filter(item => {
//         if (operator === "and") {
//             // Toutes les clés doivent matcher au moins une valeur
//             return keys.every(path => {
//                 const parts = path.split(":");
//                 const values = getByWildcardPath(item, parts);
//                 return searchValues.some(search => values.some(v => matches(v, normalize(search))));
//             });
//         } else {
//             // OR par défaut : au moins une clé doit matcher
//             return keys.some(path => {
//                 const parts = path.split(":");
//                 const values = getByWildcardPath(item, parts);
//                 return searchValues.some(search => values.some(v => matches(v, normalize(search))));
//             });
//         }
//     });
// }

/**
 * Recherche LIKE SQL multi-path avec support wildcard "*"
 * keyVal (array [key value]) : [{key:"key1",value:"value1"},...]
 * operator : "or" (défaut) ou "and" → combine les clés
 */
function searchByKeysLikeDeep(data, keyVal=[{key: "",value: ""}], operator = "or") {
    if (!data) {
        return null;
    }
    if (isEmptyObject(data)) {
      return [...data];
    }

    const keys = [];
    const searchValues = [];
    
    for (let kv of keyVal ) {
      if ( kv.value && kv.value !== undefined) {
        keys.push(kv.key);
        searchValues.push(kv.value);
      }
    }
    
    if (isEmptyObject(keys)) {
      return [...data];
    }
    console.log(keys,searchValues)
    // Normalise (accents, lower case)
    const normalize = (str, removeAccents = true) => {
        if (str == null) return "";
        let s = str.toString().toLowerCase();
        if (removeAccents) {
            s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        return s;
    };

    const matches = (field, search) => {
        if (field == null) return false;

        if (["string", "number", "boolean"].includes(typeof field)) {
            return normalize(field).includes(search);
        }

        if (Array.isArray(field)) {
            return field.some(v => matches(v, search));
        }

        if (typeof field === "object") {
            return Object.values(field).some(v => matches(v, search));
        }

        return false;
    };

    const getByWildcardPath = (obj, parts, index = 0) => {
        if (obj == null) return [];
        
        if (Array.isArray(obj)) {
            return obj.flatMap(el => getByWildcardPath(el, parts, index));
        }

        if (index >= parts.length) {
            return [obj];
        }

        const part = parts[index];

        if (part === "*") {
            if (typeof obj !== "object" || obj == null) return [];
            return Object.values(obj).flatMap(child =>
                getByWildcardPath(child, parts, index + 1)
            );
        }

        return getByWildcardPath(obj[part], parts, index + 1);
    };

    // -------------------------
    // Ajout scoring
    // -------------------------
    const scoreMatch = (value, search) => {
        const v = normalize(value);
        if (v === search) return 100;          // match exact
        if (v.startsWith(search)) return 80;   // commence par
        if (v.includes(search)) return 40;     // contient
        return 0;
    };

    const scoredResults = [];

    for (const item of data) {
        let totalScore = 0;
        let matchOK = (operator === "and");

        for (let i = 0; i < keys.length; i++) {
            const path = keys[i];
            const search = normalize(searchValues[i]);
            const parts = path.split(":");
            const values = getByWildcardPath(item, parts);

            let localScore = 0;

            for (const v of values) {
                if (matches(v, search)) {
                    const s = scoreMatch(v, search);
                    if (s > localScore) localScore = s;
                }
            }

            if (operator === "and") {
                if (localScore === 0) {
                    matchOK = false;
                    break;
                }
                totalScore += localScore;
            } else { // OR
                if (localScore > 0) {
                    matchOK = true;
                    totalScore += localScore;
                }
            }
        }

        if (matchOK) {
            scoredResults.push({ item, score: totalScore });
        }
    }

    // Tri final par score décroissant
    scoredResults.sort((a, b) => b.score - a.score);

    return scoredResults.map(r => r.item);
}



/**
 * Recherche avancée LIKE SQL avec :
 * - paths type "a:b:c"
 * - wildcard "*"
 * - multi-words
 * - accent folding (é = e)
 * - deep recursive arrays & objects
 */
function searchByKeysLikeDeepAdvanced(data, keys, query, options = {}) {
    const {
        removeAccents = true,
        multiWord = "AND", // "AND" | "OR"
    } = options;

    if (!Array.isArray(data) || !keys.length || !query || query === "*") {
        return [...data];
    }
    
    // Normalise (accents, lower case)
    const normalize = (str) => {
        if (str == null) return "";
        let s = str.toString().toLowerCase();
        if (removeAccents) {
            s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        return s;
    };

    // Découpe multi-mots : "maison golo" -> ["maison", "golo"]
    const words = query
        .split(/\s+/)
        .map(w => normalize(w))
        .filter(Boolean);

    // Vérifie LIKE pour un mot
    const likeOne = (field, word) => {
        if (field == null) return false;

        if (["string", "number", "boolean"].includes(typeof field)) {
            return normalize(field).includes(word);
        }

        if (Array.isArray(field)) {
            return field.some(v => likeOne(v, word));
        }

        if (typeof field === "object") {
            return Object.values(field).some(v => likeOne(v, word));
        }

        return false;
    };

    // Vérifie LIKE pour plusieurs mots (AND/OR)
    const likeWords = (field) => {
        if (multiWord === "AND") {
            return words.every(w => likeOne(field, w));
        }
        return words.some(w => likeOne(field, w));
    };

    // Récupère valeur(s) depuis un path avec wildcard
    const getByWildcardPath = (obj, parts, index = 0) => {
        if (obj == null) return [];

        if (Array.isArray(obj)) {
            return obj.flatMap(el => getByWildcardPath(el, parts, index));
        }

        if (index >= parts.length) {
            return [obj];
        }

        const part = parts[index];

        // Wildcard "*" → explorer toutes les props du niveau actuel
        if (part === "*") {
            if (typeof obj !== "object") return [];
            const children = Object.values(obj);
            return children.flatMap(child => 
                getByWildcardPath(child, parts, index + 1)
            );
        }

        // Propriété normale
        return getByWildcardPath(obj[part], parts, index + 1);
    };

    return data.filter(item =>
        keys.some(path => {
            const parts = path.split(":");

            // toutes les valeurs récupérées par wildcard path
            const values = getByWildcardPath(item, parts);

            return values.some(v => likeWords(v));
        })
    );
}


// /**
//  * Vérifie si un objet est vide (ne contient aucune propriété énumérable).
//  *
//  * @param {Object} obj - L'objet à tester.
//  * @returns {boolean} - Retourne true si l'objet est vide, sinon false.
//  *
//  * @example
//  * isEmptyObject({}); // true
//  * isEmptyObject({ name: "Alice" }); // false
//  */
// function isEmptyObject(obj) {
//   // Vérifie si l'objet est bien défini et de type "object"
//   if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
//     return Object.keys(obj).length === 0;
//   }
  
//   // Si ce n'est pas un objet (ou si c'est un tableau), on le considère comme non vide
//   return false;
// }

/**
 * Vérifie si un objet ou tableau est vide.
 * 
 * {} → true  
 * { a: 1 } → false  
 * [] → true  
 * [{}] → true  
 * [1] → false  
 */
function isEmptyObject(obj) {
  if (Array.isArray(obj)) {
    // tableau vide ou tableau avec uniquement des objets vides
    return obj.length === 0 || obj.every(o => isEmptyObject(o));
  }

  if (obj && typeof obj === "object") {
    return Object.keys(obj).length === 0;
  }
  
  return !obj || obj === undefined;
}

function tl_rend (min=0, max) {
    var n = Math.floor(Math.random()*(max-min+1))+min;
    return n;
}


const sanitizeNumber = (value) => {
  if (value===0) return 0;
  if (!value) return "";
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return "";
  return num;
};

// helper sleep
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// charge clé hex
const HEX_KEY = process.env.REACT_APP_CRYPT_SECRET_KEY?.trim();

/** Convertit une chaîne hex → Uint8Array */
function hexToBytes(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.substring(i, 2), 16);
  }
  return arr;
}

/** Prépare la clé AES valide (128 ou 256 bits) */
async function getKey() {
  if (!HEX_KEY) throw new Error("CRYPT_SECRET_KEY manquant dans .env");

  // tronque au format AES valide (256 bits = 64 hex chars)
  const cleanHex = HEX_KEY.slice(0, 64);
  const keyBytes = hexToBytes(cleanHex);

  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptData(data) {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return {
    iv: btoa(String.fromCharCode(...iv)),
    value: btoa(String.fromCharCode(...new Uint8Array(encrypted)))
  };
}

export async function decryptData({ iv, value }) {
  const key = await getKey();

  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  const encryptedBytes = Uint8Array.from(atob(value), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    encryptedBytes
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}

function uniqueBy(array, key) {
  return [
    ...new Map(array.map(item => [item[key], item])).values()
  ];
}
function uniqueByFn (array, keyFn) {
  const map = new Map();
  for (const item of array) {
    map.set(keyFn(item), item);
  }
  return [...map.values()];
}


function groupByKeyArray(data,key,settedKey=null) {
  if (isEmptyObject(data)) return data;
  const map = {};
  
  data.forEach(item => {
    if (!map[item[key]]) {
      map[item[key]] = {
        [(!settedKey || settedKey === undefined ? key : settedKey)]: !settedKey || settedKey === undefined ? item[key] : item[settedKey],
        items: []
      };
    }
    map[item[key]].items.push(item);
  });

  return Object.values(map);
}


/**
 * -------------------------------------------------------------
 *  DateFormatter
 *  ------------------------------------------------------------
 *  A PHP-like date formatter & parser for JavaScript.
 *  Supports:
 *    - PHP-style format() tokens
 *    - createFromFormat(format, string)
 *    - Multilingual formatting (via Intl)
 *    - Multilingual parsing (month/day names)
 *    - Auto-locale detection (browser or Node)
 *    - Optional strict mode and advanced parsing options
 * ------------------------------------------------------------
 */

class DateFormatter {
    /**
     * Creates a new DateFormatter instance.
     *
     * @param {Date|string|number} [date=new Date()] - Input date.
     * @param {object} [options]
     * @param {string} [options.locale] - Locale to use (default: auto-detect).
     * @param {string} [options.timezone] - Optional fixed timezone for output.
     */
    constructor(date = new Date(), options = {}) {
        this.date = date instanceof Date ? date : new Date(date);
        this.locale = options.locale || DateFormatter.detectLocale();
        this.timezone = options.timezone || DateFormatter.detectTimezone();
    }
    
    static detectTimezone() {
        try {
            // Works in modern browsers and Node
            return Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch {
            // If everything fails, fallback to UTC
            return "UTC";
        }
    }

    // --------------------------------------------------------
    //  Locale detection
    // --------------------------------------------------------

    /**
     * Auto-detects locale from browser or Node.
     */
    static detectLocale() {
        if (typeof navigator !== "undefined" && navigator.language)
            return navigator.language;
        try {
            return Intl.DateTimeFormat().resolvedOptions().locale;
        } catch {
            return "en";
        }
    }

    // --------------------------------------------------------
    //  Helper: zero-pad
    // --------------------------------------------------------

    static pad(num, size = 2) {
        return String(num).padStart(size, "0");
    }

    // --------------------------------------------------------
    //  Helper: remove accents + normalize for parsing
    // --------------------------------------------------------

    static normalize(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    // --------------------------------------------------------
    //  Multilingual month/weekday tables
    // --------------------------------------------------------

    static getMonthTables(locale) {
        const monthsShort = [];
        const monthsLong = [];

        for (let i = 0; i < 12; i++) {
            const date = new Date(2020, i, 1);

            monthsShort.push(
                DateFormatter.normalize(
                    date.toLocaleString(locale, { month: "short" })
                )
            );

            monthsLong.push(
                DateFormatter.normalize(
                    date.toLocaleString(locale, { month: "long" })
                )
            );
        }

        return { monthsShort, monthsLong };
    }

    static getWeekdayTables(locale) {
        const daysShort = [];
        const daysLong = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(2020, 0, 5 + i); // Monday aligned

            daysShort.push(
                DateFormatter.normalize(
                    date.toLocaleString(locale, { weekday: "short" })
                )
            );

            daysLong.push(
                DateFormatter.normalize(
                    date.toLocaleString(locale, { weekday: "long" })
                )
            );
        }

        return { daysShort, daysLong };
    }

    // --------------------------------------------------------
    //  createFromFormat — PHP-style parser
    // --------------------------------------------------------

    /**
     * Parses a date string using a PHP-style format.
     *
     * @param {string} format - PHP-style format string.
     * @param {string} dateStr - Input date text.
     * @param {object} [options]
     * @param {null|string} [options.locale] - Force locale for parsing.
     * @param {boolean} [options.strict=false] - If true, enforces exact format.
     */
    static createFromFormat(format, dateStr, options = { locale: null, strict: false }) {
        const locale = options.locale || DateFormatter.detectLocale();
        
        // Month/day tables
        const { monthsShort, monthsLong } = this.getMonthTables(locale);
        const { daysShort, daysLong } = this.getWeekdayTables(locale);

        // Build regex tokens
        const tokens = {
            // Day
            d: "(?<d>\\d{2})",
            j: "(?<d>\\d{1,2})",

            // Weekday names (ignored for the resulting date, but must match)
            D: `(?<D>${daysShort.join("|")})`,
            l: `(?<L>${daysLong.join("|")})`,

            // Month
            m: "(?<m>\\d{2})",
            n: "(?<m>\\d{1,2})",
            M: `(?<M>${monthsShort.join("|")})`,
            F: `(?<F>${monthsLong.join("|")})`,

            // Year
            Y: "(?<Y>\\d{4})",
            y: "(?<y>\\d{2})",

            // Time
            H: "(?<H>\\d{2})",
            G: "(?<H>\\d{1,2})",
            h: "(?<h>\\d{2})",
            g: "(?<h>\\d{1,2})",
            i: "(?<i>\\d{2})",
            s: "(?<s>\\d{2})",

            // AM/PM
            a: "(?<A>am|pm)",
            A: "(?<A>AM|PM)",

            // Timezone
            O: "(?<O>[+-]\\d{4})",
            P: "(?<P>[+-]\\d{2}:\\d{2})",
        };

        // Escape regex characters
        // eslint-disable-next-line no-useless-escape
        let regexStr = format.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
        
        // Replace tokens with regex
        regexStr = regexStr.replace(/\\?([a-zA-Z])/g, (match, chr) => {
            if (match.startsWith("\\")) return chr;
            return tokens[chr] || chr;
        });
        
        // const regex = new RegExp("^" + regexStr + "$", "i");
        const regex = new RegExp(
            "^" + regexStr + (options.strict ? "$" : ""),
            "i"
        );

        // Normalize input
        const normalized = DateFormatter.normalize(dateStr);
        const match = normalized.match(regex);
        
        if (!match || !match.groups) return null;

        const g = match.groups;

        // Year
        let year = g.Y ? parseInt(g.Y) : (g.y ? 2000 + parseInt(g.y) : new Date().getFullYear());

        // Month
        let month = 1;
        if (g.m) month = parseInt(g.m);
        else if (g.M) month = monthsShort.indexOf(g.M) + 1;
        else if (g.F) month = monthsLong.indexOf(g.F) + 1;

        // Day
        const day = g.d ? parseInt(g.d) : 1;

        // Time
        let hour = 0;
        if (g.H) hour = parseInt(g.H);
        else if (g.h) hour = parseInt(g.h);

        if (g.A) {
            const isPM = g.A.toLowerCase() === "pm";
            if (isPM && hour < 12) hour += 12;
            if (!isPM && hour === 12) hour = 0;
        }

        const minute = g.i ? parseInt(g.i) : 0;
        const second = g.s ? parseInt(g.s) : 0;
        
        // Build the date (UTC first)
        let date = new Date(year, month - 1, day, hour, minute, second);
        
        // Timezone adjustments
        const applyTZ = (sign, h, m) => date = new Date(date.getTime() - sign * ((h * 60 + m) * 60000));
        
        if (g.O) {
            const sign = g.O[0] === "-" ? -1 : 1;
            applyTZ(sign, parseInt(g.O.slice(1, 3)), parseInt(g.O.slice(3, 5)));
        }

        if (g.P) {
            const sign = g.P[0] === "-" ? -1 : 1;
            applyTZ(sign, parseInt(g.P.slice(1, 3)), parseInt(g.P.slice(4, 6)));
        }

        return new DateFormatter(date, { locale });
    }

    // --------------------------------------------------------
    //  format — PHP-style formatter
    // --------------------------------------------------------
    
     /**
     * Formats the current date using a PHP-style format string.
     *
     * The `fmt` parameter accepts the same formatting tokens as PHP's `date()`
     * function. All tokens below are supported. Any character not recognized as
     * a token is returned literally. To print a token literally, escape it with `\`.
     *
     * Example:
     *   df.format("Y-m-d H:i:s");       → "2025-12-10 14:05:09"
     *   df.format("\\T\\oday is l");    → "Today is Wednesday"
     *
     * ---------------------------------------------------------
     * DAY TOKENS
     * ---------------------------------------------------------
     * d  - Day of the month, 2 digits with leading zeros (01–31)
     * D  - Short weekday name (localized) e.g., "Mon", "Lun"
     * j  - Day of the month without leading zeros (1–31)
     * l  - Full weekday name (localized) e.g., "Monday", "Lundi"
     * N  - ISO weekday number (1=Monday, 7=Sunday)
     * w  - JS weekday number (0=Sunday, 6=Saturday)
     * z  - Day of the year (0–365)
     * S  - English ordinal suffix for day of month: "st", "nd", "rd", "th"
     *
     * ---------------------------------------------------------
     * WEEK TOKENS
     * ---------------------------------------------------------
     * W  - ISO week number of year (00–53)
     *
     * ---------------------------------------------------------
     * MONTH TOKENS
     * ---------------------------------------------------------
     * F  - Full month name (localized) e.g., "January", "Janvier"
     * m  - Month number with leading zero (01–12)
     * M  - Short month name (localized) e.g., "Jan", "Fév"
     * n  - Month number without leading zero (1–12)
     * t  - Number of days in the given month (28–31)
     *
     * ---------------------------------------------------------
     * YEAR TOKENS
     * ---------------------------------------------------------
     * L  - Leap year? 1 if yes, 0 otherwise
     * Y  - Four-digit year (e.g., 2025)
     * y  - Two-digit year (e.g., 25)
     *
     * ---------------------------------------------------------
     * TIME TOKENS
     * ---------------------------------------------------------
     * a  - am / pm (lowercase)
     * A  - AM / PM (uppercase)
     * g  - Hour in 12-hour format, no leading zero (1–12)
     * G  - Hour in 24-hour format, no leading zero (0–23)
     * h  - Hour in 12-hour format with leading zero (01–12)
     * H  - Hour in 24-hour format with leading zero (00–23)
     * i  - Minutes with leading zero (00–59)
     * s  - Seconds with leading zero (00–59)
     * u  - Microseconds (000000–999999)
     *
     * ---------------------------------------------------------
     * TIMEZONE TOKENS
     * ---------------------------------------------------------
     * O  - GMT offset in ±HHMM format (e.g., +0200)
     * P  - GMT offset in ±HH:MM format (e.g., +02:00)
     *
     * ---------------------------------------------------------
     * FULL FORMAT TOKENS
     * ---------------------------------------------------------
     * c  - ISO-8601 date: e.g., "2025-12-10T14:05:09.000Z"
     * r  - RFC-2822 format: e.g., "Wed, 10 Dec 2025 14:05:09 GMT"
     * U  - Unix timestamp (seconds since epoch)
     *
     * ---------------------------------------------------------
     * ADDITIONAL NOTES
     * ---------------------------------------------------------
     * • Tokens are processed character-by-character, like PHP.
     * • Unknown tokens are returned literally.
     * • Escape characters by prefixing with a backslash: "\\Y" → "Y".
     * • Localized values (weekday/month names) depend on `this.locale`.
     *
     * @param {string} fmt - The PHP-style date format string.
     * @returns {string} The formatted date string.
     */
    format(fmt) {
        const d = this.date;
        const locale = this.locale;
        
        const map = {
            // Day
            d: () => DateFormatter.pad(d.getDate()),
            D: () => d.toLocaleString(locale, { weekday: "short" }),
            j: () => d.getDate(),
            l: () => d.toLocaleString(locale, { weekday: "long" }),
            N: () => (d.getDay() || 7),
            w: () => d.getDay(),
            z: () => Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 86400000),
            S: () => {
                const j = d.getDate();
                return (j % 10 === 1 && j !== 11) ? "st" :
                       (j % 10 === 2 && j !== 12) ? "nd" :
                       (j % 10 === 3 && j !== 13) ? "rd" : "th";
            },

            // Week
            W: () => {
                const dateCopy = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                const dayNum = dateCopy.getUTCDay() || 7;
                dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - dayNum);
                const yearStart = new Date(Date.UTC(dateCopy.getUTCFullYear(), 0, 1));
                return DateFormatter.pad(Math.ceil(((dateCopy - yearStart) / 86400000 + 1) / 7));
            },

            // Month
            F: () => d.toLocaleString(locale, { month: "long" }),
            m: () => DateFormatter.pad(d.getMonth() + 1),
            M: () => d.toLocaleString(locale, { month: "short" }),
            n: () => d.getMonth() + 1,
            t: () => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(),

            // Year
            L: () => (new Date(d.getFullYear(), 1, 29).getDate() === 29 ? 1 : 0),
            Y: () => d.getFullYear(),
            y: () => String(d.getFullYear()).slice(2),

            // Time
            a: () => d.getHours() < 12 ? "am" : "pm",
            A: () => d.getHours() < 12 ? "AM" : "PM",
            g: () => d.getHours() % 12 || 12,
            G: () => d.getHours(),
            h: () => DateFormatter.pad(d.getHours() % 12 || 12),
            H: () => DateFormatter.pad(d.getHours()),
            i: () => DateFormatter.pad(d.getMinutes()),
            s: () => DateFormatter.pad(d.getSeconds()),
            u: () => DateFormatter.pad(d.getMilliseconds() * 1000, 6),

            // Timezone
            O: () => {
                const offset = -d.getTimezoneOffset();
                const sign = offset >= 0 ? "+" : "-";
                return sign +
                    DateFormatter.pad(Math.floor(Math.abs(offset) / 60)) +
                    DateFormatter.pad(Math.abs(offset) % 60);
            },
            // PHP-like timezone, locale-aware
            e: () => this.timezone || Intl.DateTimeFormat(this.locale).resolvedOptions().timeZone,

            T: () => {
                try {
                    const tz = this.timezone || Intl.DateTimeFormat(this.locale).resolvedOptions().timeZone;
                    return new Intl.DateTimeFormat(this.locale, { timeZone: tz, timeZoneName: 'short' })
                        .formatToParts(new Date())
                        .find(p => p.type === 'timeZoneName')?.value || tz;
                } catch {
                    return 'UTC';
                }
            },
            
            P: () => {
                const o = map.O();
                return o.slice(0, 3) + ":" + o.slice(3);
            },

            // Full formats
            c: () => d.toISOString(),
            r: () => d.toUTCString(),
            U: () => Math.floor(d.getTime() / 1000),
        };

        return fmt.replace(/\\?([a-zA-Z])/g, (match, chr) => {
            if (match.startsWith("\\")) return chr;
            return map[chr] ? map[chr]() : chr;
        });
    }
}

// console.log(DateFormatter.createFromFormat("Y-m-d", "2025-12-10 12:10").format("D, dS F Y  H:i:s"))

export {DateFormatter, searchByKey, doesKeyExist, searchByKeyLike,groupByKeyArray, searchByKeysLikeDeep, searchByKeysLikeDeepAdvanced, uniqueBy, uniqueByFn, isEmptyObject, tl_rend, sleep, sanitizeNumber};