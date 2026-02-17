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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          target_role: string | null
          title: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          target_role?: string | null
          title: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          target_role?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "announcements_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      app_config: {
        Row: {
          created_at: string
          description: string | null
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      attendance_logs: {
        Row: {
          check_in_lat: number | null
          check_in_long: number | null
          check_in_time: string | null
          check_out_lat: number | null
          check_out_long: number | null
          check_out_photo_url: string | null
          check_out_time: string | null
          created_at: string | null
          id: number
          photo_url: string | null
          placement_id: number | null
          status: string | null
          student_id: string
        }
        Insert: {
          check_in_lat?: number | null
          check_in_long?: number | null
          check_in_time?: string | null
          check_out_lat?: number | null
          check_out_long?: number | null
          check_out_photo_url?: string | null
          check_out_time?: string | null
          created_at?: string | null
          id?: number
          photo_url?: string | null
          placement_id?: number | null
          status?: string | null
          student_id: string
        }
        Update: {
          check_in_lat?: number | null
          check_in_long?: number | null
          check_in_time?: string | null
          check_out_lat?: number | null
          check_out_long?: number | null
          check_out_photo_url?: string | null
          check_out_time?: string | null
          created_at?: string | null
          id?: number
          photo_url?: string | null
          placement_id?: number | null
          status?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_logs_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "attendance_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          record_id: string | null
          table_name: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          record_id?: string | null
          table_name?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          record_id?: string | null
          table_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          created_at: string | null
          custom_deadline: string | null
          custom_on_time_limit: string | null
          id: number
          latitude: number
          longitude: number
          name: string
          radius_meter: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          custom_deadline?: string | null
          custom_on_time_limit?: string | null
          id?: number
          latitude: number
          longitude: number
          name: string
          radius_meter?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          custom_deadline?: string | null
          custom_on_time_limit?: string | null
          id?: number
          latitude?: number
          longitude?: number
          name?: string
          radius_meter?: number | null
        }
        Relationships: []
      }
      daily_journals: {
        Row: {
          activity_title: string | null
          created_at: string | null
          description: string | null
          evidence_photo: string | null
          id: number
          is_approved: boolean | null
          placement_id: number | null
          student_id: string
        }
        Insert: {
          activity_title?: string | null
          created_at?: string | null
          description?: string | null
          evidence_photo?: string | null
          id?: number
          is_approved?: boolean | null
          placement_id?: number | null
          student_id: string
        }
        Update: {
          activity_title?: string | null
          created_at?: string | null
          description?: string | null
          evidence_photo?: string | null
          id?: number
          is_approved?: boolean | null
          placement_id?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_journals_placement_id_fkey"
            columns: ["placement_id"]
            isOneToOne: false
            referencedRelation: "placements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_journals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "daily_journals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          message_template: string
          template_key: string
          template_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message_template: string
          template_key: string
          template_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message_template?: string
          template_key?: string
          template_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          created_at: string | null
          id: string
          message_sent: string
          notification_type: string
          parent_phone_number: string
          sent_at: string | null
          status: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_sent: string
          notification_type: string
          parent_phone_number: string
          sent_at?: string | null
          status?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message_sent?: string
          notification_type?: string
          parent_phone_number?: string
          sent_at?: string | null
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "notification_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_link: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_link?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_link?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      placements: {
        Row: {
          company_id: number
          created_at: string | null
          end_date: string | null
          id: number
          start_date: string | null
          student_id: string
        }
        Insert: {
          company_id: number
          created_at?: string | null
          end_date?: string | null
          id?: number
          start_date?: string | null
          student_id: string
        }
        Update: {
          company_id?: number
          created_at?: string | null
          end_date?: string | null
          id?: number
          start_date?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "placements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "placements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "placements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          birth_date: string | null
          birth_place: string | null
          class_name: string | null
          created_at: string | null
          device_id: string | null
          father_name: string | null
          full_name: string | null
          gender: string | null
          id: string
          mother_name: string | null
          nik: string | null
          nipd: string | null
          nisn: string | null
          parent_phone_number: string | null
          phone_number: string | null
          religion: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          class_name?: string | null
          created_at?: string | null
          device_id?: string | null
          father_name?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          mother_name?: string | null
          nik?: string | null
          nipd?: string | null
          nisn?: string | null
          parent_phone_number?: string | null
          phone_number?: string | null
          religion?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          birth_date?: string | null
          birth_place?: string | null
          class_name?: string | null
          created_at?: string | null
          device_id?: string | null
          father_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          mother_name?: string | null
          nik?: string | null
          nipd?: string | null
          nisn?: string | null
          parent_phone_number?: string | null
          phone_number?: string | null
          religion?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          count: number | null
          key: string
          window_start: string | null
        }
        Insert: {
          count?: number | null
          key: string
          window_start?: string | null
        }
        Update: {
          count?: number | null
          key?: string
          window_start?: string | null
        }
        Relationships: []
      }
      supervisor_assignments: {
        Row: {
          company_id: number | null
          created_at: string | null
          id: number
          teacher_id: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          teacher_id?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          id?: number
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supervisor_assignments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supervisor_assignments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "supervisor_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "supervisor_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_attendance_logs: {
        Row: {
          created_at: string
          created_by: string | null
          date: string
          id: number
          notes: string | null
          status: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date?: string
          id?: number
          notes?: string | null
          status: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date?: string
          id?: number
          notes?: string | null
          status?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_attendance_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "teacher_attendance_logs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_attendance_logs_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "teacher_attendance_logs_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      managed_students_view: {
        Row: {
          avatar_url: string | null
          class_name: string | null
          company_address: string | null
          company_id: number | null
          company_name: string | null
          full_name: string | null
          nisn: string | null
          student_id: string | null
          teacher_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supervisor_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "managed_students_view"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "supervisor_assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_attendance_violations: { Args: never; Returns: undefined }
      count_attendance_by_grade: {
        Args: { end_time: string; grade_filter?: string; start_time: string }
        Returns: {
          count: number
          status: string
        }[]
      }
      create_teacher_user: {
        Args: { email: string; full_name: string; password: string }
        Returns: string
      }
      debug_check_attendance_violations: {
        Args: never
        Returns: {
          log_message: string
        }[]
      }
      get_attendance_trend_by_grade: {
        Args: { end_time: string; grade_filter?: string; start_time: string }
        Returns: {
          count: number
          log_date: string
          status: string
        }[]
      }
      get_class_attendance_summary: {
        Args: { target_date: string }
        Returns: {
          alpa: number
          class_name: string
          hadir: number
          izin: number
          sakit: number
          terlambat: number
          total: number
        }[]
      }
      get_distinct_classes: {
        Args: never
        Returns: {
          class_name: string
        }[]
      }
      get_my_role: { Args: never; Returns: string }
      get_students_by_attendance_status: {
        Args: {
          class_filter?: string
          page_limit?: number
          page_offset?: number
          search_term?: string
          status_filter?: string
          target_date: string
        }
        Returns: {
          attendance_status: string
          avatar_url: string
          check_in_time: string
          check_out_time: string
          class_name: string
          company_name: string
          full_name: string
          id: string
          total_count: number
        }[]
      }
      notify_absent_students: { Args: never; Returns: undefined }
      submit_check_in: {
        Args: {
          p_device_id?: string
          p_lat: number
          p_long: number
          p_photo_url: string
          p_student_id: string
        }
        Returns: Json
      }
      submit_check_out: {
        Args: {
          p_device_id?: string
          p_lat: number
          p_long: number
          p_photo_url?: string
          p_student_id: string
        }
        Returns: Json
      }
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
