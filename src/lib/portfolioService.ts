import { supabase } from './supabase';

export interface PortfolioData {
  id?: string;
  user_id?: string;
  personal_info: any;
  summary: string;
  experience: any[];
  education: any[];
  skills: any[];
  projects: any[];
  services: any[];
  certifications: any[];
  languages: any[];
  research: any[];
  achievements: any[];
  selected_template: string;
  is_published: boolean;
  published_url?: string;
  created_at?: string;
  updated_at?: string;
}

export class PortfolioService {
  static async savePortfolio(portfolioData: Partial<PortfolioData>): Promise<{ data: any; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      console.log('Saving portfolio data:', portfolioData);

      // Check if portfolio already exists
      const { data: existingPortfolio } = await supabase
        .from('portfolios')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const portfolioPayload = {
        ...portfolioData,
        user_id: user.id,
        updated_at: new Date().toISOString()
      };

      if (existingPortfolio) {
        // Update existing portfolio
        const { data, error } = await supabase
          .from('portfolios')
          .update(portfolioPayload)
          .eq('user_id', user.id)
          .select()
          .single();

        console.log('Updated portfolio:', data, error);
        return { data, error };
      } else {
        // Create new portfolio
        const { data, error } = await supabase
          .from('portfolios')
          .insert([portfolioPayload])
          .select()
          .single();

        console.log('Created portfolio:', data, error);
        return { data, error };
      }
    } catch (error) {
      console.error('Portfolio service error:', error);
      return { data: null, error };
    }
  }

  static async getPortfolio(): Promise<{ data: any; error: any }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching portfolio:', error);
        return { data: null, error };
      }

      // Return the first portfolio if it exists, otherwise null
      const portfolio = data && data.length > 0 ? data[0] : null;
      console.log('Fetched portfolio:', portfolio);
      return { data: portfolio, error: null };
    } catch (error) {
      console.error('Portfolio service error:', error);
      return { data: null, error };
    }
  }

  static async publishPortfolio(portfolioId: string, publishedUrl: string): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .update({ 
          is_published: true, 
          published_url: publishedUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', portfolioId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async unpublishPortfolio(portfolioId: string): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .update({ 
          is_published: false, 
          published_url: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', portfolioId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}