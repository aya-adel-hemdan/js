package online.ordering.model;

import javax.persistence.*;

@Entity
public class ErrorMessageLang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long langid;
  
    private long errorid;

    private String message;

    private String LANGUAGE_CODE;

    public long getLangid() {
        return langid;
    }

    public void setLangid(long langid) {
        this.langid = langid;
    }

    public long getErrorid() {
        return errorid;
    }

    public void setErrorid(long errorid) {
        this.errorid = errorid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLANGUAGE_CODE() {
        return LANGUAGE_CODE;
    }

    public void setLANGUAGE_CODE(String LANGUAGE_CODE) {
        this.LANGUAGE_CODE = LANGUAGE_CODE;
    }
}
