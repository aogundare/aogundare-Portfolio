/**
 * This file is about my personal contact details. The purpose of this file is to keep all the contact info in one place, so it's easy to update and manage. Additionally i wanted to make it secure by not exposing my contact details directly in the codebase. This way, if someone were to look at the code, they wouldn't see my actual contact information.
 */
import { useForm, ValidationError } from '@formspree/react';
// Updating / securing my email address. 
const user = 'abeogundare';
const domain = 'gmail.com';
const email = `${user}@${domain}`;

// Updating / securing my LinkedIn profile URL.
const linkedInBase = 'www.linkedin.com/in';
const linkedInUsername = '/abraham-ogundre';
const linkedInURL = `https://${linkedInBase}${linkedInUsername}`;

// adding my github profile URL.
const githubLink='https://github.com/aogundare';
//resume path 
const resumeLink = './ao-resume.pdf';

//formspree ID for contact form submission
const formspreeId = 'xqejylwq';
export { email, linkedInURL, githubLink, resumeLink, formspreeId };