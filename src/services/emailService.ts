
import { toast } from "sonner";

// In a real app, this would send actual emails through a backend service
// For demo purposes, we'll just simulate it

export const sendLoginNotification = async (email: string, type: "login" | "signup", name?: string) => {
  console.log(`Sending ${type} notification for ${email}`);
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Log the email that would be sent
    console.log(`Email notification would be sent to: neeleshkumar10.2004@gmail.com`);
    console.log(`Subject: New ${type} on Sanrakshak`);
    console.log(`Body: User ${email} has ${type === 'login' ? 'logged in' : 'signed up'} on Sanrakshak${name ? ` with name ${name}` : ''}.`);
    
    return { success: true };
  } catch (error) {
    console.error(`Failed to send ${type} notification:`, error);
    throw error;
  }
};

export const sendEmergencyNotification = async () => {
  console.log("Sending emergency notification");
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log the email that would be sent
    console.log("Emergency notification would be sent to: neeleshkumar10.2004@gmail.com");
    console.log("Subject: URGENT: Emergency Help Requested");
    console.log("Body: Someone has requested emergency assistance through the Sanrakshak platform. Please respond immediately.");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send emergency notification:", error);
    throw error;
  }
};

export const sendRegistrationNotification = async (data: {
  type: string;
  name: string;
  contactPerson: string;
  email: string;
}) => {
  console.log(`Sending ${data.type} registration notification`);
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the email that would be sent
    console.log("Registration notification would be sent to: neeleshkumar10.2004@gmail.com");
    console.log(`Subject: New ${data.type} Registration: ${data.name}`);
    console.log(`Body: A new ${data.type} has registered on Sanrakshak:\n` +
      `Name: ${data.name}\n` +
      `Contact Person: ${data.contactPerson}\n` +
      `Email: ${data.email}`);
    
    return { success: true };
  } catch (error) {
    console.error(`Failed to send ${data.type} registration notification:`, error);
    throw error;
  }
};

export const sendDonationNotification = async (data: any) => {
  console.log(`Sending donation notification for ${data.type} donation`);
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the email that would be sent
    console.log("Donation notification would be sent to: neeleshkumar10.2004@gmail.com");
    console.log(`Subject: New ${data.type} Donation`);
    
    let body = `A new ${data.type} donation has been received:\n`;
    
    if (data.type === "money") {
      body += `Amount: ₹${data.amount}\n`;
    } else {
      body += `Items: ${data.items}\n`;
      if (data.type === "pickup") {
        body += `Pickup Address: ${data.pickupAddress}\n`;
        body += `Pickup Date: ${data.pickupDate}\n`;
      }
    }
    
    body += `From: ${data.name} (${data.email})`;
    if (data.phone) body += `\nPhone: ${data.phone}`;
    if (data.note) body += `\nNote: ${data.note}`;
    
    console.log(`Body: ${body}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send donation notification:", error);
    throw error;
  }
};

export const sendAlertSignupNotification = async (data: {
  email: string;
  phone: string;
  alertTypes: string[];
}) => {
  console.log("Sending alert signup notification");
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Log the email that would be sent
    console.log("Alert signup notification would be sent to: neeleshkumar10.2004@gmail.com");
    console.log("Subject: New Alert System Signup");
    
    let body = "A new user has signed up for alerts:\n";
    if (data.email) body += `Email: ${data.email}\n`;
    if (data.phone) body += `Phone: ${data.phone}\n`;
    body += `Alert Types: ${data.alertTypes.join(", ")}`;
    
    console.log(`Body: ${body}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send alert signup notification:", error);
    throw error;
  }
};
