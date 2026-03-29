import { User } from "../models/User.js";
import { SiteSettings } from "../models/SiteSettings.js";
import { Localization } from "../models/Localization.js";
import bcrypt from "bcrypt";

export const seedDatabase = async () => {
  try {
    // 1. Seed Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("🌱 [Seed] No users found. Seeding default admin...");
      const hashedPassword = await bcrypt.hash("admin", 10);
      await User.create({
        first_name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        user_name: "admin",
        password: hashedPassword,
        role: "admin",
        status: true,
      });
      console.log("✅ [Seed] Default admin created: admin@example.com / admin");
    }

    // 2. Seed Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      console.log("🌱 [Seed] No settings found. Seeding defaults...");
      await SiteSettings.create({
        website_title: {
          en: "My Modern Store",
          fr: "Mon Magasin Moderne",
          ar: "متجري الحديث",
        },
        logo_url: "",
        theme: {
          primary_color: "#15803d",
          secondary_color: "#eab308",
          accent_color: "#fefce8",
          bgColor: "#ffffff",
          primary_font: "Raleway",
          secondary_font: "Raleway",
        },
        home_categories_active: true,
        banner_active: true,
        benefits_active: true,
        testimonials_active: true,
        vat_config: {
          isActive: true,
          percentage: 20,
        },
        shipping_config: {
          standard_shipping_enabled: true,
          default_shipping_cost: 30,
        },
      });
      console.log("✅ [Seed] Default site settings created");
    }

    // 3. Seed Essential Translations
    const locCount = await Localization.countDocuments();
    if (locCount < 10) {
      console.log("🌱 [Seed] Missing or low translations. Seeding essential locales...");
      const essentialLocales = [
        // Login & Auth
        { key: "login.welcome", en: "Welcome Back", fr: "Bon retour", ar: "مرحباً بعودتك" },
        { key: "login.login", en: "Login", fr: "Se connecter", ar: "تسجيل الدخول" },
        { key: "login.email", en: "Email Address", fr: "Adresse e-mail", ar: "البريد الإلكتروني" },
        { key: "login.password", en: "Password", fr: "Mot de passe", ar: "كلمة المرور" },
        { key: "login.forgotPassword", en: "Forgot Password?", fr: "Mot de passe oublié ?", ar: "نسيت كلمة المرور؟" },
        { key: "login.noAccount", en: "Don't have an account?", fr: "Vous n'avez pas de compte ?", ar: "ليس لديك حساب؟" },
        { key: "login.register", en: "Register", fr: "S'inscrire", ar: "إنشاء حساب" },
        
        // General Dashboard
        { key: "Dashboard", en: "Dashboard", fr: "Tableau de bord", ar: "لوحة التحكم" },
        { key: "Settings", en: "Settings", fr: "Paramètres", ar: "الإعدادات" },
        { key: "Products", en: "Products", fr: "Produits", ar: "المنتجات" },
        { key: "Orders", en: "Orders", fr: "Commandes", ar: "الطلبات" },
        { key: "Customers", en: "Customers", fr: "Clients", ar: "العملاء" },
        { key: "Logout", en: "Logout", fr: "Déconnexion", ar: "تسجيل الخروج" },
        { key: "Save", en: "Save Changes", fr: "Enregistrer", ar: "حفظ التغييرات" },
        
        // Setup / Empty State
        { key: "CreateAccount", en: "Create an Account", fr: "Créer un compte", ar: "إنشاء حساب" },
        { key: "FirstName", en: "First Name", fr: "Prénom", ar: "الاسم الأول" },
        { key: "LastName", en: "Last Name", fr: "Nom", ar: "اسم العائلة" },
      ];

      for (const locale of essentialLocales) {
        await Localization.findOneAndUpdate(
          { key: locale.key },
          { $set: locale },
          { upsert: true }
        );
      }
      console.log("✅ [Seed] Essential translations seeded");
    }
  } catch (error) {
    console.error("❌ [Seed] Error during database seeding:", error);
  }
};
