(function () {
  'use strict';

  const form = document.getElementById('irr-form');
  const countrySelect = document.getElementById('country');
  const headerLanguageSelect = document.getElementById('header-language');
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const formStatus = document.getElementById('form-status');
  const mobileAccountRadios = document.querySelectorAll('input[name="mobile-account"]');
  const mobileNumberField = document.getElementById('mobile-number-field');
  const mobileNumberInput = document.getElementById('mobile-number');
  const phoneInputWrap = document.getElementById('phone-input-wrap');
  const phonePrefix = document.getElementById('phone-prefix');

  let selectedType = null;

  const COUNTRY_DIAL_CODES = {
    US: '+1',
    CA: '+1',
    GB: '+44',
    AU: '+61',
    DE: '+49',
    FR: '+33',
    ES: '+34',
    IT: '+39',
    MX: '+52',
    BR: '+55',
    IN: '+91',
    JP: '+81',
    CN: '+86',
    HK: '+852',
    SG: '+65',
    NZ: '+64',
    IE: '+353',
    NL: '+31',
    BE: '+32',
    CH: '+41',
    SE: '+46',
    NO: '+47',
    DK: '+45',
    FI: '+358',
    PL: '+48',
    PT: '+351',
    AT: '+43',
    PH: '+63',
    TH: '+66',
    VN: '+84',
    KR: '+82',
    TW: '+886',
    MY: '+60',
    ID: '+62',
    AE: '+971',
    SA: '+966',
    ZA: '+27',
    AR: '+54',
    CL: '+56',
    CO: '+57',
    PE: '+51',
  };

  function getDialCodeForCountry(countryCode) {
    return COUNTRY_DIAL_CODES[countryCode] || '+1';
  }

  function updatePhonePrefix() {
    phonePrefix.textContent = getDialCodeForCountry(countrySelect.value);
  }

  function getMobileAccountValue() {
    const selected = document.querySelector('input[name="mobile-account"]:checked');
    return selected ? selected.value : null;
  }

  function updateMobileNumberField() {
    const useMobileAccount = getMobileAccountValue() === 'yes';
    mobileNumberField.hidden = !useMobileAccount;

    if (!useMobileAccount) {
      mobileNumberInput.value = '';
      mobileNumberInput.classList.remove('is-invalid');
      phoneInputWrap.classList.remove('is-invalid');
      document.getElementById('mobile-number-error').textContent = '';
    }
  }

  function isValidPhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  const COUNTRIES = [
    { code: 'AL', name: 'Albania', region: 'EMEA' },
    { code: 'AD', name: 'Andorra', region: 'EMEA' },
    { code: 'AI', name: 'Anguilla', region: 'LATAM' },
    { code: 'AG', name: 'Antigua & Barbuda', region: 'LATAM' },
    { code: 'AR', name: 'Argentina', region: 'LATAM' },
    { code: 'AM', name: 'Armenia', region: 'EMEA' },
    { code: 'AW', name: 'Aruba', region: 'LATAM' },
    { code: 'AU', name: 'Australia', region: 'APAC' },
    { code: 'AT', name: 'Austria', region: 'EMEA' },
    { code: 'BS', name: 'Bahamas', region: 'LATAM' },
    { code: 'BD', name: 'Bangladesh', region: 'APAC' },
    { code: 'BB', name: 'Barbados', region: 'LATAM' },
    { code: 'BE', name: 'Belgium', region: 'EMEA' },
    { code: 'BZ', name: 'Belize', region: 'LATAM' },
    { code: 'BT', name: 'Bhutan', region: 'APAC' },
    { code: 'BO', name: 'Bolivia', region: 'LATAM' },
    { code: 'BA', name: 'Bosnia and Herzegovina', region: 'EMEA' },
    { code: 'BR', name: 'Brazil', region: 'LATAM' },
    { code: 'VG', name: 'British Virgin Islands', region: 'LATAM' },
    { code: 'BN', name: 'Brunei', region: 'APAC' },
    { code: 'BG', name: 'Bulgaria', region: 'EMEA' },
    { code: 'KH', name: 'Cambodia', region: 'APAC' },
    { code: 'KY', name: 'Cayman Islands', region: 'LATAM' },
    { code: 'CL', name: 'Chile', region: 'LATAM' },
    { code: 'CO', name: 'Colombia', region: 'LATAM' },
    { code: 'CK', name: 'Cook Islands', region: 'APAC' },
    { code: 'CR', name: 'Costa Rica', region: 'LATAM' },
    { code: 'HR', name: 'Croatia', region: 'EMEA' },
    { code: 'CW', name: 'Curaçao', region: 'LATAM' },
    { code: 'CY', name: 'Cyprus', region: 'EMEA' },
    { code: 'CZ', name: 'Czech Republic', region: 'EMEA' },
    { code: 'DK', name: 'Denmark', region: 'EMEA' },
    { code: 'DM', name: 'Dominica', region: 'LATAM' },
    { code: 'DO', name: 'Dominican Republic', region: 'LATAM' },
    { code: 'EC', name: 'Ecuador', region: 'LATAM' },
    { code: 'SV', name: 'El Salvador', region: 'LATAM' },
    { code: 'EE', name: 'Estonia', region: 'EMEA' },
    { code: 'FJ', name: 'Fiji', region: 'APAC' },
    { code: 'FI', name: 'Finland', region: 'EMEA' },
    { code: 'FR', name: 'France', region: 'EMEA' },
    { code: 'GE', name: 'Georgia', region: 'EMEA' },
    { code: 'DE', name: 'Germany', region: 'EMEA' },
    { code: 'GR', name: 'Greece', region: 'EMEA' },
    { code: 'GD', name: 'Grenada', region: 'LATAM' },
    { code: 'GT', name: 'Guatemala', region: 'LATAM' },
    { code: 'GY', name: 'Guyana', region: 'LATAM' },
    { code: 'HT', name: 'Haiti', region: 'LATAM' },
    { code: 'HN', name: 'Honduras', region: 'LATAM' },
    { code: 'HK', name: 'Hong Kong', region: 'APAC' },
    { code: 'HU', name: 'Hungary', region: 'EMEA' },
    { code: 'IS', name: 'Iceland', region: 'EMEA' },
    { code: 'ID', name: 'Indonesia', region: 'APAC' },
    { code: 'IE', name: 'Ireland', region: 'EMEA' },
    { code: 'IT', name: 'Italy', region: 'EMEA' },
    { code: 'JM', name: 'Jamaica', region: 'LATAM' },
    { code: 'KZ', name: 'Kazakhstan', region: 'EMEA' },
    { code: 'KI', name: 'Kiribati', region: 'APAC' },
    { code: 'KG', name: 'Kyrgyzstan', region: 'EMEA' },
    { code: 'LA', name: 'Laos', region: 'APAC' },
    { code: 'LV', name: 'Latvia', region: 'EMEA' },
    { code: 'LI', name: 'Liechtenstein', region: 'EMEA' },
    { code: 'LT', name: 'Lithuania', region: 'EMEA' },
    { code: 'LU', name: 'Luxembourg', region: 'EMEA' },
    { code: 'MO', name: 'Macau', region: 'APAC' },
    { code: 'MY', name: 'Malaysia', region: 'APAC' },
    { code: 'MV', name: 'Maldives', region: 'APAC' },
    { code: 'MT', name: 'Malta', region: 'EMEA' },
    { code: 'MH', name: 'Marshall Islands', region: 'APAC' },
    { code: 'MX', name: 'Mexico', region: 'LATAM' },
    { code: 'FM', name: 'Micronesia', region: 'APAC' },
    { code: 'MD', name: 'Moldova', region: 'EMEA' },
    { code: 'MN', name: 'Mongolia', region: 'APAC' },
    { code: 'ME', name: 'Montenegro', region: 'EMEA' },
    { code: 'MS', name: 'Montserrat', region: 'LATAM' },
    { code: 'MM', name: 'Myanmar', region: 'APAC' },
    { code: 'NR', name: 'Nauru', region: 'APAC' },
    { code: 'NP', name: 'Nepal', region: 'APAC' },
    { code: 'NL', name: 'Netherlands', region: 'EMEA' },
    { code: 'NZ', name: 'New Zealand', region: 'APAC' },
    { code: 'NI', name: 'Nicaragua', region: 'LATAM' },
    { code: 'NU', name: 'Niue', region: 'APAC' },
    { code: 'MK', name: 'North Macedonia', region: 'EMEA' },
    { code: 'NO', name: 'Norway', region: 'EMEA' },
    { code: 'PK', name: 'Pakistan', region: 'APAC' },
    { code: 'PW', name: 'Palau', region: 'APAC' },
    { code: 'PA', name: 'Panama', region: 'LATAM' },
    { code: 'PG', name: 'Papua New Guinea', region: 'APAC' },
    { code: 'PY', name: 'Paraguay', region: 'LATAM' },
    { code: 'PE', name: 'Peru', region: 'LATAM' },
    { code: 'PH', name: 'Philippines', region: 'APAC' },
    { code: 'PL', name: 'Poland', region: 'EMEA' },
    { code: 'PT', name: 'Portugal', region: 'EMEA' },
    { code: 'RO', name: 'Romania', region: 'EMEA' },
    { code: 'WS', name: 'Samoa', region: 'APAC' },
    { code: 'KN', name: 'Saint Kitts and Nevis', region: 'LATAM' },
    { code: 'LC', name: 'Saint Lucia', region: 'LATAM' },
    { code: 'VC', name: 'Saint Vincent and the Grenadines', region: 'LATAM' },
    { code: 'RS', name: 'Serbia', region: 'EMEA' },
    { code: 'SG', name: 'Singapore', region: 'APAC' },
    { code: 'SK', name: 'Slovakia', region: 'EMEA' },
    { code: 'SI', name: 'Slovenia', region: 'EMEA' },
    { code: 'SB', name: 'Solomon Islands', region: 'APAC' },
    { code: 'ES', name: 'Spain', region: 'EMEA' },
    { code: 'LK', name: 'Sri Lanka', region: 'APAC' },
    { code: 'SR', name: 'Suriname', region: 'LATAM' },
    { code: 'SE', name: 'Sweden', region: 'EMEA' },
    { code: 'CH', name: 'Switzerland', region: 'EMEA' },
    { code: 'TW', name: 'Taiwan', region: 'APAC' },
    { code: 'TJ', name: 'Tajikistan', region: 'EMEA' },
    { code: 'TH', name: 'Thailand', region: 'APAC' },
    { code: 'TL', name: 'Timor-Leste', region: 'APAC' },
    { code: 'TK', name: 'Tokelau', region: 'APAC' },
    { code: 'TO', name: 'Tonga', region: 'APAC' },
    { code: 'TT', name: 'Trinidad & Tobago', region: 'LATAM' },
    { code: 'TR', name: 'Türkiye', region: 'EMEA' },
    { code: 'TC', name: 'Turks and Caicos', region: 'LATAM' },
    { code: 'TV', name: 'Tuvalu', region: 'APAC' },
    { code: 'UA', name: 'Ukraine', region: 'EMEA' },
    { code: 'GB', name: 'United Kingdom', region: 'EMEA' },
    { code: 'US', name: 'United States', region: 'LATAM' },
    { code: 'UY', name: 'Uruguay', region: 'LATAM' },
    { code: 'VU', name: 'Vanuatu', region: 'APAC' },
    { code: 'VE', name: 'Venezuela', region: 'LATAM' },
    { code: 'VN', name: 'Vietnam', region: 'APAC' },
  ];

  const REGION_LANGUAGES = {
    APAC: [
      { value: 'id', label: 'Bahasa Indonesia' },
      { value: 'ms', label: 'Bahasa Melayu (Malay)' },
      { value: 'bn', label: 'Bengali' },
      { value: 'my', label: 'Burmese' },
      { value: 'en', label: 'English' },
      { value: 'fil', label: 'Filipino / Tagalog' },
      { value: 'km', label: 'Khmer' },
      { value: 'lo', label: 'Lao' },
      { value: 'mn', label: 'Mongolian' },
      { value: 'ne', label: 'Nepali' },
      { value: 'zh-Hans', label: 'Simplified Chinese' },
      { value: 'si', label: 'Sinhala' },
      { value: 'ta', label: 'Tamil' },
      { value: 'tet', label: 'Tetum' },
      { value: 'th', label: 'Thai' },
      { value: 'zh-Hant', label: 'Traditional Chinese' },
      { value: 'ur', label: 'Urdu' },
      { value: 'vi', label: 'Vietnamese' },
    ],
    EMEA: [
      { value: 'bg', label: 'Bulgarian' },
      { value: 'hr', label: 'Croatian' },
      { value: 'cs', label: 'Czech' },
      { value: 'da', label: 'Danish' },
      { value: 'nl', label: 'Dutch' },
      { value: 'en-GB', label: 'English (UK)' },
      { value: 'en-US', label: 'English (US)' },
      { value: 'et', label: 'Estonian' },
      { value: 'fi', label: 'Finnish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'el', label: 'Greek' },
      { value: 'he', label: 'Hebrew' },
      { value: 'hu', label: 'Hungarian' },
      { value: 'it', label: 'Italian' },
      { value: 'lv', label: 'Latvian' },
      { value: 'lt', label: 'Lithuanian' },
      { value: 'mk', label: 'Macedonian' },
      { value: 'no', label: 'Norwegian' },
      { value: 'pl', label: 'Polish' },
      { value: 'pt-PT', label: 'Portuguese (Portugal)' },
      { value: 'ro', label: 'Romanian' },
      { value: 'sr', label: 'Serbian' },
      { value: 'sk', label: 'Slovak' },
      { value: 'sl', label: 'Slovenian' },
      { value: 'es', label: 'Spanish (Castilian)' },
      { value: 'sv', label: 'Swedish' },
      { value: 'tr', label: 'Turkish' },
      { value: 'uk', label: 'Ukrainian' },
    ],
    LATAM: [
      { value: 'en-US', label: 'English (US)' },
      { value: 'pt-BR', label: 'Portuguese (Brazil)' },
      { value: 'es-419', label: 'Spanish (LATAM)' },
    ],
  };

  const REGION_DEFAULT_LANGUAGE = {
    APAC: 'en',
    EMEA: 'en-GB',
    LATAM: 'es-419',
  };

  const COUNTRY_DEFAULT_LANGUAGE = {
    GB: 'en-GB',
    US: 'en-US',
    BR: 'pt-BR',
  };

  function getRegionForCountry(countryCode) {
    const country = COUNTRIES.find((entry) => entry.code === countryCode);
    return country ? country.region : 'EMEA';
  }

  function populateCountryDropdown() {
    COUNTRIES.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.code;
      option.textContent = country.name;
      if (country.code === 'GB') {
        option.selected = true;
      }
      countrySelect.appendChild(option);
    });
  }

  function updateHeaderLanguages() {
    const country = countrySelect.value;
    const region = getRegionForCountry(country);
    const languages = REGION_LANGUAGES[region];
    const previousValue = headerLanguageSelect.value;

    headerLanguageSelect.innerHTML = '';
    languages.forEach((lang) => {
      const option = document.createElement('option');
      option.value = lang.value;
      option.textContent = lang.label;
      headerLanguageSelect.appendChild(option);
    });

    const preserved = languages.some((lang) => lang.value === previousValue);
    if (preserved) {
      headerLanguageSelect.value = previousValue;
      return;
    }

    const countryDefault = COUNTRY_DEFAULT_LANGUAGE[country];
    if (countryDefault && languages.some((lang) => lang.value === countryDefault)) {
      headerLanguageSelect.value = countryDefault;
      return;
    }

    const regionDefault = REGION_DEFAULT_LANGUAGE[region];
    headerLanguageSelect.value = languages.some((lang) => lang.value === regionDefault)
      ? regionDefault
      : languages[0].value;
  }

  function updateRequestTypeButtons() {
    toggleButtons.forEach((btn) => {
      const active = btn.dataset.type === selectedType;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('is-invalid');
    if (fieldId === 'mobile-number' && phoneInputWrap) {
      phoneInputWrap.classList.toggle('is-invalid', !!message);
    }
    if (errorEl) errorEl.textContent = message;
    return !!message;
  }

  function clearAllErrors() {
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    phoneInputWrap.classList.remove('is-invalid');
    form.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    clearAllErrors();
    let valid = true;

    if (!countrySelect.value) {
      valid = !setError('country', 'Please select a country.');
    }

    if (!selectedType) {
      const err = document.getElementById('request-type-error');
      if (err) err.textContent = 'Please select a request type.';
      valid = false;
    }

    const firstName = document.getElementById('first-name').value.trim();
    if (!firstName) {
      valid = !setError('first-name', 'First name is required.');
    }

    const lastName = document.getElementById('last-name').value.trim();
    if (!lastName) {
      valid = !setError('last-name', 'Last name is required.');
    }

    const email = document.getElementById('email').value.trim();
    if (!email) {
      valid = !setError('email', 'Email is required.');
    } else if (!isValidEmail(email)) {
      valid = !setError('email', 'Please enter a valid email address.');
    }

    const mobileAccount = getMobileAccountValue();
    if (!mobileAccount) {
      const err = document.getElementById('mobile-account-error');
      if (err) err.textContent = 'Please select Yes or No.';
      valid = false;
    }

    if (mobileAccount === 'yes') {
      const mobileNumber = mobileNumberInput.value.trim();
      if (!mobileNumber) {
        valid = !setError('mobile-number', 'Mobile number is required.');
      } else if (!isValidPhone(mobileNumber)) {
        valid = !setError('mobile-number', 'Please enter a valid mobile number.');
      }
    }

    return valid;
  }

  function collectFormData() {
    return {
      country: countrySelect.value,
      requestType: selectedType,
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      usedMobileAccount: getMobileAccountValue(),
      mobileCountryCode: getMobileAccountValue() === 'yes' ? phonePrefix.textContent : null,
      mobileNumber: getMobileAccountValue() === 'yes' ? mobileNumberInput.value.trim() : null,
    };
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedType = btn.dataset.type;
      updateRequestTypeButtons();
      document.getElementById('request-type-error').textContent = '';
    });
  });

  countrySelect.addEventListener('change', () => {
    updateHeaderLanguages();
    updatePhonePrefix();
  });

  mobileAccountRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      document.getElementById('mobile-account-error').textContent = '';
      updateMobileNumberField();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      formStatus.textContent = 'Please correct the errors above before submitting.';
      formStatus.className = 'form-status error';
      let scrollTarget = countrySelect.classList.contains('is-invalid')
        ? countrySelect.closest('.header-control')
        : form.querySelector('.is-invalid');

      if (!scrollTarget) {
        const formError = form.querySelector('.field-error:not(:empty)');
        if (formError) scrollTarget = formError.closest('.field-group');
      }

      if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const data = collectFormData();
    console.log('IRR Form submission (mock):', data);

    formStatus.textContent =
      'Thank you. Your privacy request has been received. This is a mockup — no data was sent to a server.';
    formStatus.className = 'form-status success';
    form.reset();
    selectedType = null;
    updateRequestTypeButtons();
    updateHeaderLanguages();
    updateMobileNumberField();
  });

  form.querySelectorAll('input, select, textarea').forEach((el) => {
    el.addEventListener('input', () => {
      el.classList.remove('is-invalid');
      if (el.id === 'mobile-number') phoneInputWrap.classList.remove('is-invalid');
      const errorEl = document.getElementById(el.id + '-error');
      if (errorEl) errorEl.textContent = '';
    });
    el.addEventListener('change', () => {
      el.classList.remove('is-invalid');
      if (el.id === 'mobile-number') phoneInputWrap.classList.remove('is-invalid');
      const errorEl = document.getElementById(el.id + '-error');
      if (errorEl) errorEl.textContent = '';
    });
  });

  updateRequestTypeButtons();
  populateCountryDropdown();
  updateHeaderLanguages();
  updatePhonePrefix();
  updateMobileNumberField();
})();
