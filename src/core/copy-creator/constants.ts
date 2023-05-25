export const VIAMAR_BRAND_IDENTITY =
  "Introduction: A brand is more than just a logo or an animation. A brand consists of several carefully selected brand elements that combined create the visual brand identity, a distinctive look and feel that makes ViaMar instantly recognizable. In our brand guidelines, we describe the elements of the visual brand identity for the ViaMar brand. These elements will help with the designing and producing of consistent, compelling communications with a high degree of creative flexibility. Discovering worlds: We are always looking for the best and most special coffee. Each coffee origin has its unique profile of flavor, acidity, body, and mouthfeel, which changes at different roast levels. We search in all directions and make a delicious and unique selection for our customers. Every coffee has its own story: Our brand identity shows that every coffee has its own culture and own background. Our identity represents the taste of coffee and the experience it provides. Local commitment: At ViaMar, we want to provide a full and rewarding coffeehouse experience. We are a neighborhood gathering place, a place where people chat, meet up, or work. We want to be part of the local community and want our coffeehouses to represent the local atmosphere. We commit to effect positive change in every community to which we are connected. Both to our customers as well as our suppliers. We support community-based organizations that focus on sustainable agriculture and food security."

export const DEFAULT_PROMPT = `You are a marketeer for a brand and your task is to write compelling copy with the selected tone of voice, length, call to action and target audiences. These parameters will be delimited by triple backticks. It is important that you do not call the target audience by its name, but address them in a way that will trigger each specific target audience. Your copy should be in line with the call to action and with the following brand identity: ${VIAMAR_BRAND_IDENTITY}`

export const TARGET_AUDIENCES = [
  { en: "Millennials", nl: "Millennials" },
  { en: "Generation Z", nl: "Generatie Z" },
  { en: "Baby Boomers", nl: "Baby Boomers" },
  { en: "Generation X", nl: "Generatie X" },
  { en: "High-Income Consumers", nl: "Grootverdieners" },
  { en: "Low-Income Consumers", nl: "Kleinverdieners" },
  { en: "Urban Consumers", nl: "Stedelijke consumenten" },
  { en: "Rural Consumers", nl: "Provinciale consumenten" },
  { en: "Male Consumers", nl: "Mannelijke consumenten" },
  { en: "Female Consumers", nl: "Vrouwelijke consumenten" },
]

export const TONE_OF_VOICE = [
  { en: "Formal", nl: "Formeel" },
  { en: "Informal", nl: "Informeel" },
  { en: "Approachable", nl: "Toegankelijk" },
  { en: "Professional", nl: "Professioneel" },
  { en: "Friendly", nl: "Vriendelijk" },
  { en: "Funny", nl: "Grappig" },
  { en: "Confident", nl: "Zelfverzekerd" },
  { en: "Inspiring", nl: "Inspirerend" },
  { en: "Witty", nl: "Geestig" },
  { en: "Approval-seeking", nl: "Bevestiging zoekend" },
  { en: "Thoughtful", nl: "Attent" },
  { en: "Encouraging", nl: "Aanmoedigend" },
  { en: "Informative", nl: "Informatief" },
  { en: "Empathetic", nl: "Empathisch" },
  { en: "Optimistic", nl: "Optimistisch" },
  { en: "Sarcastic", nl: "Sarcastisch" },
  { en: "Serious", nl: "Serieus" },
  { en: "Silly", nl: "Dwaas" },
  { en: "Expert", nl: "Expert" },
  { en: "Emotional", nl: "Emotioneel" },
]
