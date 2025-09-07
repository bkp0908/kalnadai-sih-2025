export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      Compliance_Reports: {
        Row: {
          "Compliance Status": string | null
          Date: string | null
          Designation: string | null
          District: string | null
          "Drug Reported": string | null
          "Livestock Type": string | null
          "Officer Name": string | null
          "Quantity Used": string | null
          Remarks: string | null
          "Report ID": string
        }
        Insert: {
          "Compliance Status"?: string | null
          Date?: string | null
          Designation?: string | null
          District?: string | null
          "Drug Reported"?: string | null
          "Livestock Type"?: string | null
          "Officer Name"?: string | null
          "Quantity Used"?: string | null
          Remarks?: string | null
          "Report ID": string
        }
        Update: {
          "Compliance Status"?: string | null
          Date?: string | null
          Designation?: string | null
          District?: string | null
          "Drug Reported"?: string | null
          "Livestock Type"?: string | null
          "Officer Name"?: string | null
          "Quantity Used"?: string | null
          Remarks?: string | null
          "Report ID"?: string
        }
        Relationships: []
      }
      "FARMER DASHBOARD": {
        Row: {
          AnimalID: string
          AnimalType: string | null
          BlockchainID: string | null
          Date: string | null
          District: string | null
          Dosage: string | null
          Duration: string | null
          EntryID: number
          FarmerName: string | null
          FarmName: string | null
          Frequency: string | null
          Medicine: string | null
          PhotoURL: string | null
          PrescriptionFileURL: string | null
          Reason: string | null
          State: string | null
          VetApproved: string | null
          WithdrawalStatus: string | null
        }
        Insert: {
          AnimalID: string
          AnimalType?: string | null
          BlockchainID?: string | null
          Date?: string | null
          District?: string | null
          Dosage?: string | null
          Duration?: string | null
          EntryID: number
          FarmerName?: string | null
          FarmName?: string | null
          Frequency?: string | null
          Medicine?: string | null
          PhotoURL?: string | null
          PrescriptionFileURL?: string | null
          Reason?: string | null
          State?: string | null
          VetApproved?: string | null
          WithdrawalStatus?: string | null
        }
        Update: {
          AnimalID?: string
          AnimalType?: string | null
          BlockchainID?: string | null
          Date?: string | null
          District?: string | null
          Dosage?: string | null
          Duration?: string | null
          EntryID?: number
          FarmerName?: string | null
          FarmName?: string | null
          Frequency?: string | null
          Medicine?: string | null
          PhotoURL?: string | null
          PrescriptionFileURL?: string | null
          Reason?: string | null
          State?: string | null
          VetApproved?: string | null
          WithdrawalStatus?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          department: string | null
          district: string | null
          farm_name: string | null
          full_name: string
          id: string
          license_number: string | null
          phone: string | null
          preferred_language: string | null
          role: string
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          district?: string | null
          farm_name?: string | null
          full_name: string
          id?: string
          license_number?: string | null
          phone?: string | null
          preferred_language?: string | null
          role: string
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          district?: string | null
          farm_name?: string | null
          full_name?: string
          id?: string
          license_number?: string | null
          phone?: string | null
          preferred_language?: string | null
          role?: string
          state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      "Veterinarian Dashboard": {
        Row: {
          Date: string | null
          District: string | null
          Dosage: string | null
          "License No.": string
          Name: string | null
          Notes: string | null
          "Prescribed Drug": string | null
          Specialization: string | null
          "Vet ID": string
        }
        Insert: {
          Date?: string | null
          District?: string | null
          Dosage?: string | null
          "License No.": string
          Name?: string | null
          Notes?: string | null
          "Prescribed Drug"?: string | null
          Specialization?: string | null
          "Vet ID": string
        }
        Update: {
          Date?: string | null
          District?: string | null
          Dosage?: string | null
          "License No."?: string
          Name?: string | null
          Notes?: string | null
          "Prescribed Drug"?: string | null
          Specialization?: string | null
          "Vet ID"?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
