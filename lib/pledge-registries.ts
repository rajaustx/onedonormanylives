/** Official organ donation registries by country. */

export interface RegistryLink {
  country: string;
  url: string;
  label: string;
}

export const PLEDGE_REGISTRIES: RegistryLink[] = [
  {
    country: "India",
    url: "https://www.notto.mohfw.gov.in/",
    label: "NOTTO — National Organ and Tissue Transplant Organisation",
  },
  {
    country: "United States",
    url: "https://www.organdonor.gov/sign-up",
    label: "organdonor.gov — U.S. Government Organ Donor Registry",
  },
  {
    country: "United Kingdom",
    url: "https://www.organdonation.nhs.uk/register-your-decision/",
    label: "NHS Organ Donor Register",
  },
  {
    country: "Australia",
    url: "https://www.donatelife.gov.au/",
    label: "DonateLife — Australian Organ Donor Register",
  },
  {
    country: "Canada",
    url: "https://www.canada.ca/en/health-canada/services/healthy-living/blood-organ-tissue-donation.html",
    label: "Organ and tissue donation — Canada.ca (province-specific links)",
  },
];
