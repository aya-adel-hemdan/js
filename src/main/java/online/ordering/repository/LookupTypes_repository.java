package online.ordering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import online.ordering.lookup.SYS_LOOKUP_TYPES;
import online.ordering.lookup.SYS_LOOKUP_TYPES;

public interface LookupTypes_repository extends JpaRepository<SYS_LOOKUP_TYPES, String >{

	@Query("SELECT t FROM SYS_LOOKUP_TYPES t WHERE t.PARENT_LOOKUP_TYPE !=null")
	List<SYS_LOOKUP_TYPES> findParents();
	
}
